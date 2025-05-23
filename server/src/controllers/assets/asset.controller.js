import { Asset, AssetIssuance } from "../../models/index.js";
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
    const asset = await Asset.findByPk(assetId);
    if (!asset) throw new ApiError(404, "No such assset found");

    return res
      .status(200)
      .json(new ApiResponse(200, asset, "Assets fetched !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const getAssetsByFilter = asyncHandler(async (req, res) => {
  const filters = req.body;
  if (!filters || Object.keys(filters).length === 0)
    throw new ApiError(400, "You must provide at least one filter");

  try {
    const assets = await Asset.findAll({ where: filters });

    if (!assets || assets.length === 0)
      throw new ApiError(404, "No such assets found");

    return res
      .status(200)
      .json(new ApiResponse(200, assets, "Categories fetched !!"));
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
      throw new ApiError(
        404,
        "This equipment number is not issued to any asset yet"
      );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          issuance.asset,
          "Asset fetched from equipment number !!"
        )
      );
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const addAssetInStore = asyncHandler(async (req, res) => {
  const assetDetails = req.body;

  const requiredKeys = [
    "category",
    "mfgBy",
    "modelNo",
    "description",
    "serialNo",
    "startDate",
    "endDate",
    ...(req.user.storeManaging === 0 ? ["storeId"] : []),
  ];

  for (const key of requiredKeys) {
    if (!(key in assetDetails))
      throw new ApiError(400, `Missing required key: ${key}`);
  }

  for (const key in assetDetails) {
    if (assetDetails[key] == null || assetDetails[key] === "")
      throw new ApiError(400, `Missing or invalid value: ${key}`);
  }

  try {
    const isNotValid = Object.values(assetDetails).some((field) => {
      if (typeof field === "string") return field.trim() === "";
      return field === null || field === undefined;
    });

    if (isNotValid) throw new ApiError(400, "Please fill the marked fields");

    const asset = await Asset.create({
      ...assetDetails,
      ...(!req.storeId && { storeId: req.user.storeManaging }),
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
  const amcVendor = req.body?.amcVendor || "";

  try {
    const asset = await Asset.findByPk(assetId);
    if (!asset) throw new ApiError(404, "No such asset found");

    if (req.user.storeManaging > 0 && req.user.storeManaging !== asset.storeId)
      throw new ApiError(400, "You do not manage this asset");

    if (!amcVendor && !asset.amcVendor)
      throw new ApiError(
        400,
        "Please provide the AMC Vendor to the asset before flag maintenace"
      );

    if (asset.status !== "available")
      throw new ApiError(
        401,
        "Asset can be flag for maintenance only when it is available in store"
      );

    if (amcVendor) asset.amcVendor = amcVendor;
    asset.status = "amc";

    await asset.save({ validate: true });

    return res
      .status(200)
      .json(new ApiResponse(200, asset, "Maintenance status toggled !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const updateAssetDetails = asyncHandler(async (req, res) => {
  const { assetId } = req.params;
  const updateDetails = req.body;

  const allowedFields = [
    "startDate",
    "endDate",
    "description",
    "po",
    "pr",
    "grn",
    "srr",
    "materialCode",
    "amcVendor",
    "addInfo",
  ];

  try {
    const asset = await Asset.findByPk(assetId);
    if (!asset) throw new ApiError(404, "No such asset found");

    if (req.user.storeManaging > 0 && req.user.storeManaging !== asset.storeId)
      throw new ApiError(400, "You do not manage this asset");

    Object.keys(updateDetails).forEach((key) => {
      if (allowedFields.includes(key)) {
        asset[key] = updateDetails[key];
      } else {
        throw new ApiError(400, "Details with asset identity can't be changed");
      }
    });

    asset.updatedBy = req.user.id;
    asset.inWarranty = new Date(updateDetails.endDate) > new Date();

    await asset.save({ validate: true });

    return res
      .status(200)
      .json(new ApiResponse(200, asset, "Asset updated !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});
