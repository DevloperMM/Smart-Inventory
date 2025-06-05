import { fn, literal, col } from "sequelize";
import { Asset, Consumable, Stock } from "../../models/index.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getStock = asyncHandler(async (req, res) => {
  try {
    const assetRecords = await Asset.findAll({
      attributes: [
        "category",
        "storeId",
        [fn("COUNT", col("*")), "count"],
        [literal(`'ASSET'`), "itemType"],
      ],
      group: ["category", "storeId"],
      raw: true,
    });

    const consumableRecords = await Consumable.findAll({
      attributes: [
        "category",
        "storeId",
        [fn("COUNT", col("*")), "count"],
        [literal(`'CONSUMABLE'`), "itemType"],
      ],
      group: ["category", "storeId"],
      raw: true,
    });

    const combined = [...assetRecords, ...consumableRecords];

    const finalRecords = await Promise.all(
      combined.map(async (record) => {
        const { category, storeId, itemType } = record;
        const [stock, created] = await Stock.findOrCreate({
          where: { category, storeId, itemType },
        });

        return {
          category,
          storeId,
          itemType,
          storeQty: Number(record.count),
          alertQty: stock.alertQty,
        };
      })
    );

    if (!finalRecords)
      throw new ApiError(404, "No assets and consumables found in store");

    return res
      .status(200)
      .json(new ApiResponse(200, finalRecords, "Stock fetched and updated"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const changeStockAlert = asyncHandler(async (req, res) => {
  try {
    const { stockId } = req.params;
    let { alertCount } = req.body || {};

    if (typeof alertCount !== "number")
      throw new ApiError(400, "Invalid value for alert");

    alertCount = parseInt(alertCount);

    const stock = await Stock.findByPk(stockId);
    if (!stock) throw new ApiError(404, "No such stock found");

    if (req.user.storeManaging > 0 && req.user.storeManaging !== stock.storeId)
      throw new ApiError(
        400,
        `You do not manage this ${stock.itemType.toLowerCase()}`
      );

    stock.alertQty = alertCount;
    await stock.save();

    return res
      .status(200)
      .json(new ApiResponse(200, stock, "Alert Updated !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});
