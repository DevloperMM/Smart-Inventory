import db from "../../lib/db.js";
import {
  Asset,
  Consumable,
  Transfer,
  Transit,
  User,
} from "../../models/index.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getTranferRecords = asyncHandler(async (req, res) => {
  try {
    const transfers = await Transfer.findAll({
      include: [
        { model: User, as: "sender" },
        { model: User, as: "receiver" },
      ],
    });

    const result = await Promise.all(
      transfers.map(async (transfer) => {
        // --- ASSETS POPULATION ---
        const assetIds = Array.isArray(transfer.assets) ? transfer.assets : [];
        const assetDetails = assetIds.length
          ? await Asset.findAll({
              where: { id: assetIds },
              attributes: ["id", "category", "serialNo"],
            })
          : [];

        // --- CONSUMABLES POPULATION ---
        // const rawConsumables = Array.isArray(transfer.consumables)
        //   ? transfer.consumables
        //   : [];

        // const consumableIDs = rawConsumables.map((c) => c.id);

        // const consumableRecords = consumableIDs.length
        //   ? await Consumable.findAll({
        //       where: { id: consumableIDs },
        //       attributes: ["id", "category"],
        //       raw: true,
        //     })
        //   : [];

        // const consumableMap = Object.fromEntries(
        //   consumableRecords.map((c) => [c.id, c])
        // );

        // const consumableDetails = rawConsumables.map((item) => {
        //   const matched = consumableMap[item.id];
        //   return {
        //     category: matched.category,
        //     qty: item.qty,
        //     isUsed: item.isUsed,
        //   };
        // });

        // return {
        //   ...transfer.toJSON(),
        //   assetDetails,
        //   consumableDetails,
        // };

        const consumables = Array.isArray(transfer.consumables)
          ? transfer.consumables
          : [];

        // Group by id and sum qty
        const consumableQtyMap = {};
        for (const item of consumables) {
          if (!item?.id || typeof item.qty !== "number") continue;

          if (consumableQtyMap[item.id]) {
            consumableQtyMap[item.id] += item.qty;
          } else {
            consumableQtyMap[item.id] = item.qty;
          }
        }

        const consumableIds = Object.keys(consumableQtyMap);

        const consumableDetails = consumableIds.length
          ? await Consumable.findAll({
              where: { id: consumableIds },
              attributes: ["id", "category"],
            })
          : [];

        const consumableSummary = consumableDetails.map((c) => ({
          id: c.id,
          category: c.category,
          qty: consumableQtyMap[c.id] || 0,
        }));

        return {
          ...transfer.toJSON(),
          assets: assetDetails,
          consumables: consumableSummary,
        };
      })
    );

    return res
      .status(200)
      .json(new ApiResponse(200, result, "Transfers fetched successfully"));
  } catch (err) {
    console.log(err);
    throw new ApiError(err?.statusCode || 500, err?.message);
  }
});

export const createTransfer = asyncHandler(async (req, res) => {
  const { transitId, assets = [], consumables = [] } = req.body || {};
  // assets is array of asset IDs
  // consumables is array of object of consumable IDs, isUsed, qty

  if (!Array.isArray(assets) || !Array.isArray(consumables))
    throw new ApiError(
      400,
      "No expected arguments received in assets or consumables"
    );

  if (assets.length <= 0 && consumables.length <= 0)
    throw new ApiError(400, "This transfer does not contain any items");

  // Check for duplicate asset IDs
  if (new Set(assets).size !== assets.length)
    throw new ApiError(400, "Duplicate assets are not allowed");

  const cIDs = consumables.map((c) => c.id);
  const c_keySet = new Set();
  for (const c of consumables) {
    const key = `${c.id}|${c.isUsed}`;
    if (c_keySet.has(key))
      throw new ApiError(
        400,
        "Duplicate consumables with same usage status is not allowed"
      );
    c_keySet.add(key);
  }

  const transaction = await db.transaction();

  try {
    const transit = await Transit.findByPk(transitId, { transaction });
    if (!transit) throw new ApiError(404, "No such transit request found");

    if (transit.status === "exported")
      throw new ApiError(
        400,
        "A transfer has been made already against this transit request"
      );

    if (
      req.user.storeManaging > 0 &&
      req.user.storeManaging !== transit.fromStore
    )
      throw new ApiError(400, "You do not manage the source store");

    if (transit.status !== "approved")
      throw new ApiError(400, "Only approved transits can be transferred");

    // --- ASSET CHECKS ---
    let fetchedAssets = [];
    if (assets.length > 0) {
      fetchedAssets = await Asset.findAll({
        where: { id: assets, status: "available" },
        transaction,
      });

      if (fetchedAssets.length !== assets.length)
        throw new ApiError(400, "Missing or invalid assets provided");

      const invalidStoreAsset = fetchedAssets.find(
        (a) => a.storeId !== transit.fromStore
      );

      if (invalidStoreAsset)
        throw new ApiError(400, "Some assets do not belong to your store");

      await Asset.update(
        { status: "in-transit" },
        { where: { id: assets }, transaction }
      );
    }

    // --- CONSUMABLE CHECKS ---
    let fetchedConsumables = [];
    const c_cat_map = {};
    if (consumables.length > 0) {
      fetchedConsumables = await Consumable.findAll({
        where: { id: cIDs },
        transaction,
      });

      if (fetchedConsumables.length !== consumables.length)
        throw new ApiError(400, "Missing or invalid consumables provided");

      const fetchedMap = Object.fromEntries(
        fetchedConsumables.map((c) => [c.id, c])
      );

      for (const c of consumables) {
        const fetched = fetchedMap[c.id];
        if (!fetched) continue;

        if (fetched.storeId !== transit.fromStore) {
          throw new ApiError(
            400,
            "Some consumables do not belong to your store"
          );
        }

        const availableQty = c.isUsed ? fetched.usedQty : fetched.newQty;
        if (availableQty < c.qty)
          throw new ApiError(400, "Insufficient quantity for given status");
      }

      // Update quantities
      for (const c of consumables) {
        const field = c.isUsed ? "usedQty" : "newQty";
        await Consumable.increment(
          { [field]: -c.qty },
          { where: { id: c.id }, transaction }
        );

        const cat = fetchedMap[c.id].category.trim();
        c_cat_map[cat] = (c_cat_map[cat] || 0) + c.qty;
      }
    }

    // --- CATEGORY-WISE MATCHING ---
    const asset_cat_map = {};
    fetchedAssets.forEach((a) => {
      asset_cat_map[a.category] = (asset_cat_map[a.category] || 0) + 1;
    });

    for (const { category, qty } of transit.items || []) {
      const assetQty = asset_cat_map[category] || 0;
      const consumableQty = c_cat_map[category] || 0;
      const total = assetQty + consumableQty;

      if (total < qty)
        throw new ApiError(400, "You are not transferring required stock");

      if (total > qty)
        throw new ApiError(400, "Excess quantity can't be transferred");
    }

    // --- CREATE TRANSFER ---
    const transfer = await Transfer.create(
      {
        transitId,
        transferredBy: req.user.id,
        assets,
        consumables,
        status: "in-transit",
      },
      { transaction }
    );

    if (!transfer)
      throw new ApiError(
        500,
        "Error while transferring items! Please try again after sometime"
      );

    await transit.update({ status: "exported" }, { transaction });

    await transaction.commit();

    return res
      .status(200)
      .json(new ApiResponse(200, transfer, "Transfer created !!"));
  } catch (err) {
    await transaction.rollback();
    throw new ApiError(err?.statusCode || 500, err?.message);
  }
});

export const receiveTransfer = asyncHandler(async (req, res) => {
  const { transferId } = req.params || {};
  const { transitId } = req.query || {};

  const transaction = await db.transaction();

  try {
    const transfer = await Transfer.findByPk(transferId, { transaction });
    if (!transfer) throw new ApiError(400, "No such transfer request found");

    const transit = await Transit.findByPk(transitId, { transaction });
    if (!transit) throw new ApiError(404, "Missing or invalid transit details");

    if (transfer.transitId !== transit.id)
      throw new ApiError(400, "Incorrect transitId provided for this transfer");

    if (
      req.user.storeManaging > 0 &&
      req.user.storeManaging !== transit.toStore
    )
      throw new ApiError(401, "You can receive transfer for your store only");

    if (transfer.status !== "in-transit")
      throw new ApiError(400, "Only in-transit transfers can be received");

    transfer.status = "transferred";
    transfer.receivedBy = req.user.id;

    await Asset.update(
      { status: "available", storeId: transit.toStore },
      { where: { id: transfer.assets }, transaction }
    );

    for (let { id, isUsed, qty } of transfer.consumables) {
      const oldStoreItem = await Consumable.findByPk(id, { transaction });

      const newStoreItem = await Consumable.findOne({
        where: {
          category: oldStoreItem.category,
          specs: oldStoreItem.specs,
          storeId: transit.toStore,
        },
        transaction,
      });

      if (!newStoreItem) {
        // Create a new consumable record in the destination store
        await Consumable.create(
          {
            category: oldStoreItem.category,
            specs: oldStoreItem.specs,
            newQty: isUsed ? 0 : qty,
            usedQty: isUsed ? qty : 0,
            storeId: transit.toStore,
            updatedOn: new Date(),
            updatedBy: req.user.id,
          },
          { transaction }
        );
      } else {
        // Update existing quantities
        const updatedQty = isUsed
          ? { usedQty: newStoreItem.usedQty + qty }
          : { newQty: newStoreItem.newQty + qty };

        await newStoreItem.update(
          {
            ...updatedQty,
            updatedOn: new Date(),
            updatedBy: req.user.id,
          },
          { transaction }
        );
      }
    }

    await transfer.save({ transaction });

    await transaction.commit();

    return res
      .status(200)
      .json(new ApiResponse(200, transfer, "Transfer received !!"));
  } catch (err) {
    await transaction.rollback();
    throw new ApiError(err?.statusCode || 500, err?.message);
  }
});
