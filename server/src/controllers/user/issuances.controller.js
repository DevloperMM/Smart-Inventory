import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import {
  Asset,
  AssetIssuance,
  Consumable,
  ConsumableIssuance,
  User,
} from "../../models";

export const myAssetIssuances = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  try {
    const assets = await AssetIssuance.findAll({
      where: { issuedTo: userId },
      include: [
        {
          model: Asset,
          as: "asset",
          attributes: ["id", "category", "mfgBy", "serialNo", "status"],
        },
        {
          model: User,
          as: "issuer",
          attributes: ["id", "name", "email", "department", "role"],
        },
        {
          model: Request,
          as: "request",
          attributes: ["id", "userId", "category", "purpose", "status"],
          include: [
            { model: User, as: "requester", attributes: ["name", "email"] },
          ],
        },
      ],
    });

    if (assets.length <= 0)
      throw new ApiError(404, "No issuances found against you");

    return res
      .status(200)
      .json(new ApiResponse(200, assets, "Issued assets fetched !!"));
  } catch (err) {
    throw new ApiError(err?.statusCode || 500, err?.message);
  }
});

export const myConsumableIssuances = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  try {
    const consumables = await ConsumableIssuance.findAll({
      where: { issuedTo: userId },
      include: [
        {
          model: Consumable,
          as: "consumable",
          attributes: ["id", "category", "specs", "mfgBy", "status"],
        },
        {
          model: User,
          as: "issuer",
          attributes: ["id", "name", "email", "department", "role"],
        },
        {
          model: Request,
          as: "request",
          attributes: ["id", "userId", "category", "purpose", "status"],
          include: [
            { model: User, as: "requester", attributes: ["name", "email"] },
          ],
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

export const returnIssuedAsset = asyncHandler(async (req, res) => {
  const { assetIssuanceId } = req.params;

  try {
    const issuance = await AssetIssuance.findByPk(assetIssuanceId);

    if (!issuance) throw new ApiError(404, "No such issued asset found");

    if (issuance.status === "Raised-Return" || issuance.status === "Returned")
      throw new ApiError(
        400,
        "Return is either initiated or completed already"
      );

    issuance.status = "Raised-Return";
    await issuance.save();

    return res
      .status(200)
      .json(new ApiResponse(200, issuance, "Return request raised !!"));
  } catch (err) {
    throw new ApiError(err?.statusCode || 500, err?.message);
  }
});

export const returnIssuedConsumable = asyncHandler(async (req, res) => {
  const { consumableIssuanceId } = req.params;

  try {
    const issuance = await AssetIssuance.findByPk(consumableIssuanceId);

    if (!issuance) throw new ApiError(404, "No such issued consumable found");

    if (issuance.status === "Raised-Return" || issuance.status === "Returned")
      throw new ApiError(
        400,
        "Return is either initiated or completed already"
      );

    issuance.status = "Raised-Return";
    await issuance.save();

    return res
      .status(200)
      .json(new ApiResponse(200, issuance, "Return request raised !!"));
  } catch (err) {
    throw new ApiError(err?.statusCode || 500, err?.message);
  }
});
