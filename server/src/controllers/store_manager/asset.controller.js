import { Asset, Request } from "../../models";
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";

export const getAllAssets = asyncHandler(async (req, res) => {});

export const addAssetInStore = asyncHandler(async (req, res) => {});

export const getAllAssetIssuances = asyncHandler(async (req, res) => {});

export const issueAssetForRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const { assetSerialNo, equipNo, addInfo } = req.body;

  try {
    const request = await Request.findByPk(requestId);
    if (!request) throw new ApiError(404, "No such request found");
    else if (request.status !== "Approved")
      throw new ApiError(400, "Asset can't be issued without approval");

    const asset = await Asset.findOne({ where: { serialNo: assetSerialNo } });
    if (!asset) throw new ApiError(404, "No such asset found");
    else if (asset?.dataValues.status !== "Available")
      throw new ApiError(404, "This asset can't be issued");

    const issuance = await Issue.create({
      request: requestId,
      asset: asset.id,
      equipNo,
      issuedBy: req.user.id,
      issuedOn: new Date(),
      issuedTo: request.user,
      endUser: request.endUser,
      addInfo,
      status: "Issued",
    });

    if (!issuance)
      throw new ApiError(
        500,
        "Error occured while issuing the asset! Please try again after sometime!"
      );

    asset.status = "Issued";
    request.status = "Issued";

    await Promise.all([asset.save(), request.save()]);

    return res
      .status(200)
      .json(new ApiResponse(200, issuance, "Asset issuance created !!"));
  } catch (err) {
    throw new ApiError(err.statusCode, err?.message);
  }
});

export const receiveReturnForAsset = asyncHandler(async (req, res) => {});

export const getAllAssetDisposals = asyncHandler(async (req, res) => {});

export const createDisposeForAsset = asyncHandler(async (req, res) => {});
