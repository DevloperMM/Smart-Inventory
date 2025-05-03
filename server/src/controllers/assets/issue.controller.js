import { Asset, Request } from "../../models";
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";

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

export const getUserAssetRequests = asyncHandler(async (req, res) => {
  try {
    const requests = await Request.findAll();
    if (requests.length === 0) throw new ApiError(404, "No records found");

    return res
      .status(200)
      .json(new ApiResponse(200, requests, "Requests fetched !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const getAllAssetIssuances = asyncHandler(async (req, res) => {});

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
