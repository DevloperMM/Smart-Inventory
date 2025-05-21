import { Asset, AssetIssuance, Request, User } from "../../models/index.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const issueAssetForRequest = asyncHandler(async (req, res) => {
  const { requestId, assetId, equipNo } = req.body;

  try {
    const request = await Request.findByPk(requestId);
    const asset = await Asset.findByPk(assetId);

    if (req.user.storeManaging > 0) {
      if (req.user.storeManaging !== asset.storeId)
        throw new ApiError(400, "You do not manage this asset");
      else if (req.user.storeManaging !== request.storeId)
        throw new ApiError(400, "The request does not belongs to your store");
    }

    if (!request) throw new ApiError(404, "No such request found");
    else if (request.status !== "approved")
      throw new ApiError(400, "No asset issuance can be done without approval");

    if (!asset) throw new ApiError(404, "No such asset found");
    else if (asset.status !== "available")
      throw new ApiError(404, "This asset is not available in store");

    const issuance = await AssetIssuance.create({
      requestId,
      assetId,
      equipNo,
      issuedBy: req.user.id,
      issuedTo: request.requestedBy,
      endUser: request.endUser,
      status: "issued",
    });

    if (!issuance)
      throw new ApiError(
        500,
        "Error occured while issuing the asset! Please try again after sometime!"
      );

    asset.status = "issued";
    await asset.save();

    return res
      .status(200)
      .json(new ApiResponse(200, issuance, "Asset Issued !!"));
  } catch (err) {
    console.log(err);
    throw new ApiError(err.statusCode, err?.message);
  }
});

export const getAllAssetIssuances = asyncHandler(async (req, res) => {
  try {
    const assetIssuances = await AssetIssuance.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        { model: Asset, as: "asset" },
        { model: User, as: "issuer" },
        { model: User, as: "recipient" },
        { model: User, as: "handler", required: false },
      ],
    });

    if (!assetIssuances || assetIssuances.length <= 0)
      throw new ApiError(404, "No asset is issued yet");

    return res
      .status(200)
      .json(new ApiResponse(200, assetIssuances, "Asset Issuances fetched !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const getAssetIssuancesByAssetId = asyncHandler(async (req, res) => {
  const { assetId } = req.params;

  try {
    const issuances = await AssetIssuance.findAll({
      where: { assetId },
      order: [["createdAt", "ASC"]],
      include: [
        { model: Asset, as: "asset" },
        { model: User, as: "issuer" },
        { model: User, as: "recipient" },
        { model: User, as: "handler", required: false },
      ],
    });

    if (!issuances || issuances.length === 0) {
      throw new ApiError(404, "No issuances found for this asset");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, issuances, "Asset issuances fetched successfully")
      );
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const getAssetsIssuedToMe = asyncHandler(async (req, res) => {
  try {
    const assets = await AssetIssuance.findAll({
      where: { issuedTo: req.user.id },
      include: [
        { model: Asset, as: "asset" },
        { model: User, as: "issuer" },
        {
          model: Request,
          as: "request",
          include: [{ model: User, as: "requester" }],
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

// export const returnIssuedAsset = asyncHandler(async (req, res) => {
//   const { assetIssuanceId } = req.params;

//   try {
//     const issuance = await AssetIssuance.findByPk(assetIssuanceId);

//     if (!issuance) throw new ApiError(404, "No such issued asset found");

//     if (issuance.status === "Raised-Return" || issuance.status === "Returned")
//       throw new ApiError(
//         400,
//         "Return is either initiated or completed already"
//       );

//     issuance.status = "Raised-Return";
//     await issuance.save();

//     return res
//       .status(200)
//       .json(new ApiResponse(200, issuance, "Return request raised !!"));
//   } catch (err) {
//     throw new ApiError(err?.statusCode || 500, err?.message);
//   }
// });
