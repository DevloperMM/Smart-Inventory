import { Asset } from "../../models/index.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const createStock = asyncHandler(async (req, res) => {});

export const createStockAlert = asyncHandler(async (req, res) => {});

export const getStock = asyncHandler(asyncHandler(async (req, res) => {}));

export const getAllAssetCategories = asyncHandler(async (req, res) => {
  try {
    const records = await Asset.findAll({
      attributes: ["category"],
      group: ["category"],
      raw: true,
    });

    if (!records || records.length <= 0)
      throw new ApiError(404, "No such records found");

    const categories = records.map((record) => record.category);

    return res
      .status(200)
      .json(new ApiResponse(200, categories, "Categories fetched !!"));
  } catch (err) {
    throw new ApiError(500, err.message || "Failed to fetch asset categories");
  }
});
