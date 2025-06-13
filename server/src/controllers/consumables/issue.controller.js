import { Op } from "sequelize";
import {
  Asset,
  AssetIssuance,
  Consumable,
  ConsumableIssuance,
  Request,
  User,
} from "../../models/index.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getAllConsumableIssuances = asyncHandler(async (req, res) => {
  try {
    const consumableIssuances = await ConsumableIssuance.findAll({
      include: [
        { model: Consumable, as: "consumable" },
        { model: Asset, as: "asset" },
        { model: User, as: "issuer" },
        { model: User, as: "recipient" },
        { model: User, as: "handler", required: false },
      ],
    });

    if (!consumableIssuances || consumableIssuances.length <= 0)
      throw new ApiError(404, "No consumable is issued yet");

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          consumableIssuances,
          "Consumable Issuances fetched !!"
        )
      );
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const getConsumablesIssuedToMe = asyncHandler(async (req, res) => {
  try {
    const consumables = await ConsumableIssuance.findAll({
      where: { issuedTo: req.user.id },
      include: [
        { model: Consumable, as: "consumable" },
        { model: User, as: "issuer" },
        {
          model: Request,
          as: "request",
          include: [{ model: User, as: "requester" }],
        },
      ],
    });

    if (consumables.length <= 0)
      throw new ApiError(404, "No issuances found against you");

    return res
      .status(200)
      .json(new ApiResponse(200, consumables, "Issued consumables fetched !!"));
  } catch (err) {
    throw new ApiError(err?.statusCode || 500, err?.message);
  }
});

export const issueConsumableForRequest = asyncHandler(async (req, res) => {
  const {
    requestId,
    consumableId,
    assetId,
    isUsed = false,
    isIntegrable = false,
  } = req.body || {};

  if (!consumableId || !assetId || !requestId)
    throw new ApiError(404, "Please provide necessary details");

  try {
    const request = await Request.findByPk(requestId);
    const asset = await Asset.findByPk(assetId);
    const consumable = await Consumable.findByPk(consumableId);

    if (req.user.storeManaging > 0) {
      if (req.user.storeManaging !== consumable.storeId)
        throw new ApiError(400, "You do not manage this consumable");
      else if (req.user.storeManaging !== request.storeId)
        throw new ApiError(400, "The request does not belongs to your store");
    }

    if (!request) throw new ApiError(404, "No such request found");
    else if (request.status !== "approved")
      throw new ApiError(
        400,
        "No consumable can be issued without approving it"
      );

    if (!asset) throw new ApiError(404, "No such asset found");

    const issuedAsset = await AssetIssuance.findOne({
      where: {
        assetId: asset.id,
        issuedTo: request.requestedBy,
        status: "issued",
      },
    });

    if (!issuedAsset)
      throw new ApiError(
        400,
        "Consumable can be issued only if the asset is owned by user itself"
      );

    if (!consumable) throw new ApiError(404, "No such consumable found");

    if (
      (isUsed && consumable.usedQty <= 0) ||
      (!isUsed && consumable.newQty <= 0)
    )
      throw new ApiError(
        404,
        isUsed ? "No stock found which is used earlier" : "No new stock found"
      );

    const issuance = await ConsumableIssuance.create({
      requestId,
      consumableId,
      toAssetId: assetId,
      issuedBy: req.user.id,
      issuedTo: request.requestedBy,
      status: isIntegrable ? "embedded" : "standalone",
    });

    if (!issuance)
      throw new ApiError(
        500,
        "Error occured while issuing the consumable! Please try again after sometime!"
      );

    request.status = "issued";
    isUsed ? (consumable.usedQty -= 1) : (consumable.newQty -= 1);

    await Promise.all([consumable.save(), request.save({ silent: true })]);

    return res
      .status(200)
      .json(new ApiResponse(200, issuance, "Consumable issued !!"));
  } catch (err) {
    throw new ApiError(err.statusCode, err?.message);
  }
});

export const handleIssuedConsumable = asyncHandler(async (req, res) => {
  const { consumableIssuanceId } = req.params;
  const { reason, status = "returned" } = req.body || {};

  const statusValue = status.toLowerCase();

  try {
    const issuance = await ConsumableIssuance.findByPk(consumableIssuanceId);
    if (!issuance)
      throw new ApiError(404, "No such issue found against consumable");

    const consumable = await Consumable.findByPk(issuance.consumableId);

    if (
      req.user.storeManaging > 0 &&
      req.user.storeManaging !== consumable.storeId
    )
      throw new ApiError(400, "You do not manage this consumable");

    if (req.user.storeManaging > 0 && statusValue !== "returned")
      throw new ApiError(401, "You can not exempt this return");

    if (!["standalone", "embedded"].includes(issuance.status))
      throw new ApiError(
        400,
        "You can handle return of issued consumables only"
      );

    if (!reason)
      throw new ApiError(
        400,
        "You must add appropriate reason for your action for future reference"
      );

    issuance.handledBy = req.user.id;
    issuance.handleInfo = reason;
    issuance.status = statusValue;

    if (status === "returned") consumable.usedQty += 1;

    await Promise.all([consumable.save(), issuance.save()]);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { ...issuance.toJSON(), consumable },
          "Return successful !!"
        )
      );
  } catch (err) {
    throw new ApiError(err?.statusCode || 500, err?.message);
  }
});

export const getIssuedConsumablestoAsset = asyncHandler(async (req, res) => {
  const { assetId } = req.params;

  try {
    const consumables = await ConsumableIssuance.findAll({
      where: {
        toAssetId: assetId,
        status: {
          [Op.in]: ["embedded", "standalone"],
        },
      },
      include: [
        { model: Consumable, as: "consumable" },
        { model: Asset, as: "asset" },
        { model: User, as: "recipient" },
      ],
    });

    if (consumables.length <= 0)
      throw new ApiError(404, "No consumables issued against this asset");

    return res
      .status(200)
      .json(new ApiResponse(200, consumables, "Issued consumables fetched !!"));
  } catch (err) {
    throw new ApiError(err?.statusCode || 500, err?.message);
  }
});
