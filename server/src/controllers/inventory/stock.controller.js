import { Asset, Consumable } from "../../models/index.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const createStock = asyncHandler(async (req, res) => {});

export const getStock = asyncHandler(asyncHandler(async (req, res) => {}));

export const addStockAlert = asyncHandler(async (req, res) => {});

export const getAllAssetCategories = asyncHandler(async (req, res) => {
  try {
    const records = await Asset.findAll({
      attributes: ["category"],
      group: ["category"],
      raw: true,
    });

    if (!records || records.length <= 0)
      throw new ApiError(404, "No assets found in store");

    const categories = records.map((record) => record.category);

    return res
      .status(200)
      .json(new ApiResponse(200, categories, "Categories fetched !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const getAllConsumableCategories = asyncHandler(async (req, res) => {
  try {
    const records = await Consumable.findAll({
      attributes: ["category"],
      group: ["category"],
      raw: true,
    });

    if (!records || records.length <= 0)
      throw new ApiError(404, "No consumables found in store");

    const categories = records.map((record) => record.category);

    return res
      .status(200)
      .json(new ApiResponse(200, categories, "Categories fetched !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});
