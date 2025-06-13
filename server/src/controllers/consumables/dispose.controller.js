import { Consumable, ConsumableDisposal, User } from "../../models/index.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const createConsumableDispose = asyncHandler(async (req, res) => {
  const { consumableId, isUsed, qty, condition, description, decisionInfo } =
    req.body || {};

  if (!(consumableId && condition && description))
    throw new ApiError(400, "Please provide the marked fields");

  if (req.user.storeManaging === 0 && !decisionInfo)
    throw new ApiError(
      400,
      "You must add approval comments for your future reference"
    );

  try {
    const consumable = await Consumable.findByPk(consumableId);
    if (!consumable)
      throw new ApiError(404, "No such consumable details found to dispose");

    if (
      req.user.storeManaging > 0 &&
      req.user.storeManaging !== consumable.storeId
    )
      throw new ApiError(400, "You do not manage this consumable");

    if (isUsed ? consumable.usedQty < qty : consumable.newQty < qty)
      throw new ApiError(
        400,
        "Your store does not contain the provided consumable qty to dispose"
      );

    const consumableDisposal = await ConsumableDisposal.create({
      consumableId,
      isUsed,
      qty,
      condition,
      raisedOn: new Date(),
      raisedBy: req.user.id,
      reason: description,
      status: req.user.storeManaging > 0 ? "pending" : "disposed",
      ...(req.user.storeManaging === 0 && {
        decidedBy: req.user.id,
        decidedOn: new Date(),
        decisionInfo,
      }),
    });

    if (!consumableDisposal)
      throw new ApiError(
        500,
        "Error occured while creating dispose! Please try again after sometime!"
      );

    if (consumableDisposal.status === "disposed") {
      await consumable.update({
        ...(isUsed
          ? { usedQty: consumable.usedQty - qty }
          : { newQty: consumable.newQty - qty }),
      });
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          consumableDisposal,
          "Consumable dispose created !!"
        )
      );
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const decideDisposeRequest = asyncHandler(async (req, res) => {
  const { status, decisionInfo } = req.body || {};
  const { consumableDisposeId } = req.params;

  if (!status)
    throw new ApiError(400, "You must give your consent or reject the dispose");

  if (!decisionInfo)
    throw new ApiError(
      400,
      "You must add approval comments for your future reference"
    );

  const statusValue = status.toLowerCase();

  try {
    const consumableDisposal = await ConsumableDisposal.findByPk(
      consumableDisposeId
    );

    if (!consumableDisposal)
      throw new ApiError(404, "No such dispose found against any consumable");

    if (consumableDisposal.status !== "pending")
      throw new ApiError(400, "Only pending requests can be decided");

    if (!["disposed", "rejected"].includes(statusValue))
      throw new ApiError(400, "The request can only be approved or rejected");

    consumableDisposal.decidedBy = req.user.id;
    consumableDisposal.decidedOn = new Date();
    consumableDisposal.decisionInfo = decisionInfo;
    consumableDisposal.status = statusValue;

    const item = await Consumable.findByPk(consumableDisposal.consumableId);
    if (!item)
      throw new ApiError(404, "No valid consumable found with this disposal");

    const updatedFields = consumableDisposal.isUsed
      ? { usedQty: item.usedQty - consumableDisposal.qty }
      : { newQty: item.newQty - consumableDisposal.qty };

    const [updatedItem, updatedDispose] = await Promise.all([
      item.update(updatedFields),
      consumableDisposal.save(),
    ]);

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedDispose, "Consumable dispose decided !!")
      );
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const sellDisposedConsumable = asyncHandler(async (req, res) => {
  const { consumableDisposeId } = req.params;
  const soldInfo = req.body?.soldInfo || "";

  if (!soldInfo)
    throw new ApiError(
      400,
      "You must add sell comments for your future reference"
    );

  try {
    const consumableDisposal = await ConsumableDisposal.findByPk(
      consumableDisposeId
    );

    if (!consumableDisposal)
      throw new ApiError(404, "No such dispose found against any consumable");

    if (consumableDisposal.status !== "disposed")
      throw new ApiError(400, "Only disposed consumables can be sold out");

    consumableDisposal.soldBy = req.user.id;
    consumableDisposal.soldOn = new Date();
    consumableDisposal.soldInfo = soldInfo;
    consumableDisposal.status = "sold";

    const updated = await consumableDisposal.save();

    return res
      .status(200)
      .json(new ApiResponse(200, updated, "Consumable sold !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const getAllConsumableDisposals = asyncHandler(async (req, res) => {
  try {
    const consumableDisposes = await ConsumableDisposal.findAll({
      order: [["raisedOn", "DESC"]],
      include: [
        { model: Consumable, as: "consumable" },
        { model: User, as: "requester" },
        { model: User, as: "decider", required: false },
        { model: User, as: "seller", required: false },
      ],
    });

    if (consumableDisposes.length <= 0)
      throw new ApiError(404, "No consumable is disposed yet");

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          consumableDisposes,
          "Consumable disposals fetched !!"
        )
      );
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const cancelDisposeRequest = asyncHandler(async (req, res) => {
  const { cancelInfo } = req.body || {};
  const { consumableDisposeId } = req.params;

  if (!cancelInfo)
    throw new ApiError(
      400,
      "You must add approval comments for your future reference"
    );

  try {
    const consumableDisposal = await ConsumableDisposal.findByPk(
      consumableDisposeId,
      { include: [{ model: User, as: "requester" }] }
    );

    if (!consumableDisposal)
      throw new ApiError(404, "No such dispose found against any consumable");

    if (consumableDisposal.status !== "pending")
      throw new ApiError(400, "Only pending requests can be cancelled");

    if (consumableDisposal.requester.storeManaging !== req.user.storeManaging)
      throw new ApiError(
        400,
        "You can not cancel this as not requested by your store"
      );

    consumableDisposal.decidedBy = req.user.id;
    consumableDisposal.decidedOn = new Date();
    consumableDisposal.decisionInfo = cancelInfo;
    consumableDisposal.status = "cancelled";

    const item = await Consumable.findByPk(consumableDisposal.consumableId);
    if (!item)
      throw new ApiError(404, "No valid consumable found with this disposal");

    const update = await consumableDisposal.save();

    return res
      .status(200)
      .json(new ApiResponse(200, update, "Consumable dispose cancelled !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});
