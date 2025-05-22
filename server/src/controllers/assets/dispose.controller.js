import { Asset, AssetDisposal, User } from "../../models/index.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const createAssetDispose = asyncHandler(async (req, res) => {
  const { assetId, condition, description, decisionInfo = "" } = req.body;

  if (!(assetId && condition && description))
    throw new ApiError(400, "Please fill the marked fields");

  if (req.user.storeManaging === 0 && !decisionInfo)
    throw new ApiError(
      400,
      "You must add approval comments for your future reference"
    );

  try {
    const asset = await Asset.findByPk(assetId);
    if (!asset) throw new ApiError(404, "No such asset found to dispose");

    if (req.user.storeManaging > 0 && req.user.storeManaging !== asset.storeId)
      throw new ApiError(400, "You do not manage this asset");

    const disposal = await AssetDisposal.findOne({
      where: { assetId },
      order: [["raisedOn", "DESC"]],
    });

    if (disposal?.status === "pending")
      throw new ApiError(
        400,
        "No dispose can be generated against asset if it is already pending"
      );

    if (asset.status !== "available")
      throw new ApiError(400, "This asset is not available in store currently");

    const assetDisposal = await AssetDisposal.create({
      assetId,
      condition,
      description,
      raisedOn: new Date(),
      raisedBy: req.user.id,
      status: req.user.storeManaging > 0 ? "pending" : "disposed",
      ...(req.user.storeManaging === 0 && {
        decidedBy: req.user.id,
        decidedOn: new Date(),
        decisionInfo,
      }),
    });

    if (!assetDisposal)
      throw new ApiError(
        500,
        "Error occured while creating dispose! Please try again after sometime!"
      );

    if (assetDisposal.status === "disposed") asset.status = "disposed";

    return res
      .status(200)
      .json(new ApiResponse(200, assetDisposal, "Asset dispose created !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const decideDisposeRequest = asyncHandler(async (req, res) => {
  const { status, decisionInfo } = req.body || "";
  const { assetDisposeId } = req.params;

  if (!status || !decisionInfo)
    throw new ApiError(
      400,
      "You must add approval comments for your future reference"
    );

  try {
    const assetDisposal = await AssetDisposal.findByPk(assetDisposeId);
    if (!assetDisposal)
      throw new ApiError(404, "No such dispose found against any asset");

    const asset = await Asset.findByPk(assetDisposal.assetId);

    if (assetDisposal.status !== "pending")
      throw new ApiError(400, "Only pending requests can be decided");

    if (!["disposed", "rejected"].includes(status.toLowerCase()))
      throw new ApiError(400, "The request can only be approved or rejected");

    assetDisposal.decidedBy = req.user.id;
    assetDisposal.decidedOn = new Date();
    assetDisposal.decisionInfo = decisionInfo;
    assetDisposal.status = status.toLowerCase();

    asset.status = "disposed";

    await Promise.all[(assetDisposal.save(), asset.save())];

    const updatedRecord = await AssetDisposal.findByPk(assetDisposeId, {
      include: [
        { model: Asset, as: "asset" },
        { model: User, as: "requester" },
        { model: User, as: "decider" },
      ],
    });

    return res
      .status(200)
      .json(new ApiResponse(200, updatedRecord, "Asset dispose decided !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const sellDisposedAsset = asyncHandler(async (req, res) => {
  const { soldInfo } = req.body || "";
  const { assetDisposeId } = req.params;

  if (!soldInfo)
    throw new ApiError(
      400,
      "You must add sold comments for your future reference"
    );

  try {
    const assetDisposal = await AssetDisposal.findByPk(assetDisposeId);
    if (!assetDisposal)
      throw new ApiError(404, "No such dispose found against any asset");

    const asset = await Asset.findByPk(assetDisposal.assetId);

    if (assetDisposal.status !== "disposed")
      throw new ApiError(400, "Only disposed assets can be sold out");

    assetDisposal.soldBy = req.user.id;
    assetDisposal.soldOn = new Date();
    assetDisposal.soldInfo = soldInfo;
    assetDisposal.status = "sold";

    asset.status = "sold";

    await Promise.all[(assetDisposal.save(), asset.save())];

    const updatedRecord = await AssetDisposal.findByPk(assetDisposeId, {
      include: [
        { model: Asset, as: "asset" },
        { model: User, as: "requester" },
        { model: User, as: "decider" },
      ],
    });

    return res
      .status(200)
      .json(new ApiResponse(200, updatedRecord, "Asset sold !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const getAllAssetDisposals = asyncHandler(async (req, res) => {
  try {
    const assetDisposals = await AssetDisposal.findAll({
      order: [["raisedOn", "DESC"]],
      include: [
        { model: Asset, as: "asset" },
        { model: User, as: "requester" },
        { model: User, as: "decider", required: false },
        { model: User, as: "seller", required: false },
      ],
    });

    if (!assetDisposals || assetDisposals.length <= 0)
      throw new ApiError(404, "No asset is issued yet");

    return res
      .status(200)
      .json(new ApiResponse(200, assetDisposals, "Asset Issuances fetched !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});
