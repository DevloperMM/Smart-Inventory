import { Consumable } from "../../models/index.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getAllConsumables = asyncHandler(async (req, res) => {
  try {
    const consumables = await Consumable.findAll({
      order: [["updatedOn", "DESC"]],
    });

    if (consumables.length <= 0)
      throw new ApiError(404, "No consumables found");

    return res
      .status(200)
      .json(new ApiResponse(200, consumables, "Consumables fetched !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const addConsumableInStore = asyncHandler(async (req, res) => {
  const { category, specs, qty, storeId, amcVendor = "" } = req.body;

  const status = req.body.status.toLowerCase();
  if (!(status && ["used", "unused", "vendor"].includes(status)))
    throw new ApiError(400, "You must provide the relevant status");

  if (!(category.trim() && specs.trim() && qty))
    throw new ApiError(400, "Please fill the marked fields");

  if (req.user.storeManaging === 0 && !storeId)
    throw new ApiError(400, "You must provide the storeId to add");

  try {
    const consumable = await Consumable.create({
      category: category.toLowerCase(),
      specs,
      qty,
      storeId: req.user.storeManaging || storeId,
      updatedBy: req.user.id,
      amcVendor,
      status,
    });

    if (!consumable)
      throw new ApiError(
        500,
        "Error occured while creating consumable! Please try again after sometime!"
      );

    return res
      .status(200)
      .json(new ApiResponse(200, consumable, "Consumable listed !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const markToVendor = asyncHandler(async (req, res) => {
  const { consumableId } = req.params;

  const { category, specs, qty, storeId, amcVendor } = req.body;
  if (!(category.trim() && specs.trim()))
    throw new ApiError(400, "Please provide consumable details");

  if (!qty) throw new ApiError(400, "");

  const status = req.body?.status.toLowerCase() || "";
  if (!status || !["used", "unused"].includes(status))
    throw new ApiError(400, "You must provide valid status");

  try {
    const consumable = await Consumable.findAll({ where: { category, specs } });
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const receiveFromVendor = asyncHandler(async (req, res) => {});
