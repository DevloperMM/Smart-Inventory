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

export const editConsumable = asyncHandler(async (req, res) => {
  const { consumableId } = req.params;

  const { specs, amcVendor } = req.body || {};
  if (!specs && !amcVendor)
    throw new ApiError(400, "Please fill the marked fields");

  try {
    const consumable = await Consumable.findByPk(consumableId);
    if (!consumable) throw new ApiError(404, "No such consumable found");

    if (
      req.user.storeManaging > 0 &&
      req.user.storeManaging !== consumable.storeId
    )
      throw new ApiError(400, "You do not manage this consumable");

    Object.keys(req.body || {}).forEach((key) => {
      if (!["specs", "amcVendor"].includes(key))
        throw new ApiError(
          400,
          `Either ${key} is invalid property or unchangeable`
        );
    });

    if (specs) consumable.specs = specs;
    if (amcVendor) consumable.amcVendor = amcVendor;

    await consumable.save({ validate: true });

    return res
      .status(200)
      .json(new ApiResponse(200, consumable, "Consumable updated !!"));
  } catch (err) {
    throw new ApiError(err?.statusCode || 500, err?.message);
  }
});

export const markToVendor = asyncHandler(async (req, res) => {
  const { consumableId } = req.params;
  const { qty, amcVendor } = req.body;

  try {
    const consumable = await Consumable.findByPk(consumableId);
    if (!consumable) throw new ApiError(400, "No such consumable found");

    if (consumable.status === "new")
      throw new ApiError(
        400,
        "These consumables are not eligible to mark vendor"
      );

    if (consumable.status === "vendor")
      throw new ApiError(400, "You can mark your store consumables only");

    if (!amcVendor && !consumable.amcVendor)
      throw new ApiError(400, "Please provide vendor details to avail AMC");

    if (qty <= 0 || qty > consumable.qty)
      throw new ApiError(400, "Please provide valid qty to mark vendor");

    let resultConsumable;

    const existingVendorConsumable = await Consumable.findOne({
      where: {
        category: consumable.category,
        specs: consumable.specs,
        amcVendor,
        storeId: consumable.storeId,
        status: "vendor",
      },
    });

    if (existingVendorConsumable) {
      existingVendorConsumable.qty += qty;
      existingVendorConsumable.updatedBy = req.user.id;
      existingVendorConsumable.updatedOn = new Date();
      await existingVendorConsumable.save();
      resultConsumable = existingVendorConsumable;
    } else {
      resultConsumable = await Consumable.create({
        ...consumable.toJSON(),
        qty,
        updatedBy: req.user.id,
        updatedOn: new Date(),
        amcVendor,
        status: "vendor",
      });
    }

    return res
      .status(200)
      .json(new ApiResponse(200, resultConsumable, "Marked to vendor !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const unmarkFromVendor = asyncHandler(async (req, res) => {});

export const receiveFromVendor = asyncHandler(async (req, res) => {});
