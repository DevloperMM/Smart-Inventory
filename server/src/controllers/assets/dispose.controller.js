import { Asset, AssetDisposal, User } from "../../models/index.js";
import { Op } from "sequelize";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const createAssetDispose = asyncHandler(async (req, res) => {
  const { assetId, condition, description, decisionInfo } = req.body || {};

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

    if (asset.status !== "available")
      throw new ApiError(400, "This asset is not available in store");

    const disposal = await AssetDisposal.findOne({
      where: {
        assetId,
        status: {
          [Op.in]: ["pending", "disposed"],
        },
      },
    });

    if (disposal)
      throw new ApiError(
        400,
        "No dispose can be generated against asset whose request is either pending or already disposed"
      );

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

    if (assetDisposal.status === "disposed") {
      asset.status = "disposed";
      await asset.save();
    }

    return res
      .status(200)
      .json(new ApiResponse(200, assetDisposal, "Asset dispose created !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const decideDisposeRequest = asyncHandler(async (req, res) => {
  const { status, decisionInfo } = req.body || {};
  const { assetDisposeId } = req.params;

  if (!status)
    throw new ApiError(400, "You must give your consent or reject the dispose");

  if (!decisionInfo)
    throw new ApiError(
      400,
      "You must add approval comments for your future reference"
    );

  const statusValue = status.toLowerCase();

  try {
    const assetDisposal = await AssetDisposal.findByPk(assetDisposeId);

    if (!assetDisposal)
      throw new ApiError(404, "No such dispose found against any asset");

    if (assetDisposal.status !== "pending")
      throw new ApiError(400, "Only pending requests can be decided");

    if (!["disposed", "rejected"].includes(statusValue))
      throw new ApiError(400, "The request can only be approved or rejected");

    assetDisposal.decidedBy = req.user.id;
    assetDisposal.decidedOn = new Date();
    assetDisposal.decisionInfo = decisionInfo;
    assetDisposal.status = statusValue;

    const update = await assetDisposal.save();
    if (status === "disposed")
      await Asset.update({ status }, { where: { id: assetDisposal.assetId } });

    return res
      .status(200)
      .json(new ApiResponse(200, update, "Asset dispose decided !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const sellDisposedAsset = asyncHandler(async (req, res) => {
  const { assetDisposeId } = req.params;
  const soldInfo = req.body?.soldInfo || "";

  if (!soldInfo)
    throw new ApiError(
      400,
      "You must add sell comments for your future reference"
    );

  try {
    const assetDisposal = await AssetDisposal.findByPk(assetDisposeId);
    if (!assetDisposal)
      throw new ApiError(404, "No such dispose found against any asset");

    if (assetDisposal.status !== "disposed")
      throw new ApiError(400, "Only disposed assets can be sold out");

    assetDisposal.soldBy = req.user.id;
    assetDisposal.soldOn = new Date();
    assetDisposal.soldInfo = soldInfo;
    assetDisposal.status = "sold";

    const [updatedDispose, updatedAsset] = await Promise.all([
      assetDisposal.save(),
      await Asset.update(
        { status: "sold" },
        { where: { id: assetDisposal.assetId } }
      ),
    ]);

    return res
      .status(200)
      .json(new ApiResponse(200, updatedAsset, "Asset sold !!"));
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
      throw new ApiError(404, "No asset is disposed yet");

    return res
      .status(200)
      .json(new ApiResponse(200, assetDisposals, "Asset disposals fetched !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const cancelDisposeRequest = asyncHandler(async (req, res) => {
  const { cancelInfo } = req.body || {};
  const { assetDisposeId } = req.params;

  if (!cancelInfo)
    throw new ApiError(
      400,
      "You must add approval comments for your future reference"
    );

  try {
    const assetDisposal = await AssetDisposal.findByPk(assetDisposeId, {
      include: [{ model: User, as: "requester" }],
    });

    if (!assetDisposal)
      throw new ApiError(404, "No such dispose found against any consumable");

    if (assetDisposal.status !== "pending")
      throw new ApiError(400, "Only pending requests can be cancelled");

    if (assetDisposal.requester.storeManaging !== req.user.storeManaging)
      throw new ApiError(
        400,
        "You can not cancel this as not requested by your store"
      );

    assetDisposal.decidedBy = req.user.id;
    assetDisposal.decidedOn = new Date();
    assetDisposal.decisionInfo = cancelInfo;
    assetDisposal.status = "cancelled";

    const item = await Asset.findByPk(assetDisposal.assetId);
    if (!item)
      throw new ApiError(404, "No valid asset found with this disposal");

    const update = await assetDisposal.save();

    return res
      .status(200)
      .json(new ApiResponse(200, update, "Consumable dispose cancelled !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});
