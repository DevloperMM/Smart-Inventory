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
  const { category, specs, qty, storeId } = req.body;

  if (!category.trim() || !specs.trim())
    throw new ApiError(400, "Please fill the marked fields");

  if (req.user.storeManaging === 0 && !storeId)
    throw new ApiError(400, "You must provide the storeId to add");

  try {
    const isConsumableExist = await Consumable.findOne({
      where: { category: category.trim(), specs: specs.trim(), storeId },
    });

    if (isConsumableExist)
      throw new ApiError(
        400,
        "Consumable already exist in store with these specifications"
      );

    const consumable = await Consumable.create({
      category,
      specs,
      newQty: qty,
      storeId: req.user.storeManaging || storeId,
      updatedBy: req.user.id,
      updatedOn: new Date(),
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

export const editConsumable = asyncHandler(async (req, res) => {
  const { consumableId } = req.params;

  const specs = req.body?.specs || "";
  if (!specs) throw new ApiError(400, "Please provide specifications");

  try {
    const consumable = await Consumable.findByPk(consumableId);
    if (!consumable) throw new ApiError(404, "No such consumable found");

    if (
      req.user.storeManaging > 0 &&
      req.user.storeManaging !== consumable.storeId
    )
      throw new ApiError(400, "You do not manage this consumable");

    consumable.specs = specs;
    await consumable.save();

    return res
      .status(200)
      .json(new ApiResponse(200, consumable, "Consumable updated !!"));
  } catch (err) {
    throw new ApiError(err?.statusCode || 500, err?.message);
  }
});

export const updateQty = asyncHandler(async (req, res) => {
  const { consumableId } = req.params;

  const { qty, isUsed } = req.body || {};
  if (!qty) throw new ApiError(400, "Please provide valid quantity");

  try {
    const consumable = await Consumable.findByPk(consumableId);
    if (!consumable) throw new ApiError(404, "No such consumable found");

    if (
      req.user.storeManaging > 0 &&
      req.user.storeManaging !== consumable.storeId
    )
      throw new ApiError(400, "You do not manage this consumable");

    if (isUsed) consumable.usedQty += qty;
    else consumable.newQty += qty;

    consumable.updatedBy = req.user.id;
    consumable.updatedOn = new Date();
    await consumable.save();

    return res
      .status(200)
      .json(new ApiResponse(200, consumable, "Consumable updated !!"));
  } catch (err) {
    throw new ApiError(err?.statusCode || 500, err?.message);
  }
});
