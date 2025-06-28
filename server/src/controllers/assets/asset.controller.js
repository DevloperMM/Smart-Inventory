import { Asset, AssetIssuance, User } from "../../models/index.js";
import { parseISO, isValid } from "date-fns";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getAllAssets = asyncHandler(async (req, res) => {
  try {
    const assets = await Asset.findAll({ order: [["createdAt", "DESC"]] });

    if (assets.length <= 0) throw new ApiError(404, "No assets found");

    return res
      .status(200)
      .json(new ApiResponse(200, assets, "Assets fetched !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const getAssetById = asyncHandler(async (req, res) => {
  const { assetId } = req.params;

  try {
    const asset = await Asset.findByPk(assetId, {
      include: [{ model: User, as: "storeKeeper", attributes: ["name"] }],
    });

    if (!asset) throw new ApiError(404, "No such assset found");

    return res
      .status(200)
      .json(new ApiResponse(200, asset, "Assets fetched !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const getAssetsByFilter = asyncHandler(async (req, res) => {
  const filters = req.body || {};
  if (!filters || Object.keys(filters).length === 0)
    throw new ApiError(400, "You must provide at least one filter");

  try {
    const assets = await Asset.findAll({ where: filters });

    return res
      .status(200)
      .json(new ApiResponse(200, assets, "Assets fetched with filter !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const getAssetByEquipNo = asyncHandler(async (req, res) => {
  const { equipNo } = req.params;

  try {
    const issuance = await AssetIssuance.findOne({
      where: { equipNo },
      include: [{ model: Asset, as: "asset" }],
    });

    if (!issuance)
      throw new ApiError(404, "No such asset found with this equipment number");

    return res
      .status(200)
      .json(
        new ApiResponse(200, issuance.asset, `Asset fetched with ${equipNo} !!`)
      );
  } catch (err) {
    throw new ApiError(err?.statusCode || 500, err?.message);
  }
});

export const addAssetInStore = asyncHandler(async (req, res) => {
  const assetDetails = req.body || {};

  const requiredKeys = [
    "category",
    "mfgBy",
    "modelNo",
    "description",
    "serialNo",
    "startDate",
    "endDate",
    "storeId",
  ];

  if (
    req.user.storeManaging > 0 &&
    assetDetails.storeId !== req.user.storeManaging
  )
    throw new ApiError(400, "You can add asset in your store only");

  for (const key of requiredKeys) {
    if (!(key in assetDetails))
      throw new ApiError(400, `Missing required key: ${key}`);
  }

  for (const key in assetDetails) {
    if (
      requiredKeys.includes(key) &&
      (!assetDetails[key] ||
        (typeof assetDetails[key] === "string" &&
          assetDetails[key].trim() === ""))
    )
      throw new ApiError(400, `Missing or invalid value: ${key}`);
  }

  try {
    const asset = await Asset.create({
      ...assetDetails,
      inWarranty: new Date(assetDetails.endDate) > new Date(),
      stockedBy: req.user.id,
      status: "available",
    });

    if (!asset)
      throw new ApiError(
        500,
        "Error occured while creating asset! Please try again after sometime!"
      );

    return res.status(200).json(new ApiResponse(200, asset, "Asset listed !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const toggleAssetMaintenance = asyncHandler(async (req, res) => {
  const { assetId } = req.params;

  try {
    const asset = await Asset.findByPk(assetId);
    if (!asset) throw new ApiError(404, "No such asset found");

    if (req.user.storeManaging > 0 && req.user.storeManaging !== asset.storeId)
      throw new ApiError(400, "You do not manage this asset");

    if (!asset.amcVendor)
      throw new ApiError(400, "Specify vendor name using edit details");

    if (!["available", "amc"].includes(asset.status))
      throw new ApiError(
        401,
        "Asset can be flagged for maintenance only when it is available in store"
      );

    let flaggedAMC = asset.status === "amc";

    if (flaggedAMC) {
      asset.status = "available";
      flaggedAMC = false;
    } else {
      asset.status = "amc";
      flaggedAMC = true;
    }

    await asset.save({ validate: true });

    return res
      .status(200)
      .json(
        new ApiResponse(200, { flaggedAMC }, "Maintenance status toggled !!")
      );
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const updateAssetDetails = asyncHandler(async (req, res) => {
  const { assetId } = req.params;
  const updateDetails = req.body || {};

  const allowedFields = [
    "startDate",
    "endDate",
    "description",
    "po",
    "pr",
    "grn",
    "srr",
    "amcVendor",
    "addInfo",
  ];

  try {
    const asset = await Asset.findByPk(assetId);
    if (!asset) throw new ApiError(404, "No such asset found");

    if (req.user.storeManaging > 0 && req.user.storeManaging !== asset.storeId)
      throw new ApiError(400, "You do not manage this asset");

    Object.keys(updateDetails).forEach((key) => {
      const value = updateDetails[key];

      if (
        allowedFields.includes(key) &&
        typeof value === "string" &&
        value !== asset[key]
      ) {
        asset[key] = value.trim();
      }
    });

    if (typeof updateDetails.endDate === "string") {
      const parsedDate = parseISO(updateDetails.endDate);
      if (isValid(parsedDate)) asset.inWarranty = parsedDate > new Date();
    }

    asset.updatedBy = req.user.id;
    const updatedAsset = await asset.save({ validate: true });

    return res
      .status(200)
      .json(new ApiResponse(200, updatedAsset, "Asset updated !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});
