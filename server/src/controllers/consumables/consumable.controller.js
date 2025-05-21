import { Consumable } from "../../models/index.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getAllConsumables = asyncHandler(async (req, res) => {
  try {
    const consumables = await Consumable.findAll({});

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
  const consumableDetails = req.body;

  try {
    const isNotValid = Object.values(consumableDetails).some((field) => {
      if (typeof field === "string") return field.trim() === "";
      return field === null || field === undefined;
    });

    if (isNotValid) throw new ApiError(400, "Please fill the marked fields");

    const consumable = await Consumable.create({
      ...consumableDetails,
      ...(!req.storeId && { storeId: req.user.storeManaging }),
      updatedBy: req.user.id,
      status: "unused",
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
