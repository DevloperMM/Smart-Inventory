import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { Transit, User } from "../../models/index.js";
import {
  getAssetCategories,
  getConsumableCategories,
} from "../../utils/categories.js";

export const getTransitRequests = asyncHandler(async (req, res) => {
  try {
    const transits = await Transit.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        { model: User, as: "requester" },
        { model: User, as: "decider", required: false },
        { model: User, as: "validator", required: false },
      ],
    });

    if (transits.length <= 0)
      throw new ApiError(404, "No transit requests found");

    return res
      .status(200)
      .json(new ApiResponse(200, transits, "Transit Requests fetched !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const createTransitRequest = asyncHandler(async (req, res) => {
  const { items, description, fromStore, toStore } = req.body;

  try {
    const [assetCats, consumableCats] = await Promise.all([
      getAssetCategories(),
      getConsumableCategories(),
    ]);

    const allowedCategories = [...assetCats, ...consumableCats];

    // items -> array of category and qty
    if (!items || !Array.isArray(items) || items.length === 0)
      throw new ApiError(
        400,
        "No request can be made without items to transfer"
      );

    for (const item of items) {
      if (
        typeof item !== "object" ||
        !item?.category ||
        !item?.qty ||
        typeof item.qty !== "number"
      )
        throw new ApiError(
          400,
          "Each item must be an object with valid category and qty"
        );

      if (!allowedCategories.includes(item.category))
        throw new ApiError(400, "Invalid category");
      if (item.qty <= 0)
        throw new ApiError(400, "Atleast 1 qty must be there per category");
    }

    if (!description || !fromStore || !toStore)
      throw new ApiError(400, "Please fill all required fields");

    if (fromStore === toStore)
      throw new ApiError(400, "Transfer must have different exit and entry");

    if (req.user.storeManaging > 0 && req.user.storeManaging !== toStore)
      throw new ApiError(400, "You can request tranfer to your store only");

    const transit = await Transit.create({
      items,
      description,
      fromStore,
      toStore,
      requestedBy: req.user.id,
      status: "pending",
    });

    if (!transit)
      throw new ApiError(
        500,
        "Error while creating transit request! Please try again after sometime"
      );

    return res
      .status(200)
      .json(new ApiResponse(200, transit, "Transit requested !!"));
  } catch (err) {
    throw new ApiError(err?.statusCode || 500, err?.message);
  }
});

export const cancelTransitRequest = asyncHandler(async (req, res) => {
  const { transitId } = req.params;
  const cancelReason = req.body?.cancelReason || "";

  try {
    const transit = await Transit.findByPk(transitId, {
      include: [{ model: User, as: "requester" }],
    });

    if (!transit) throw new ApiError(404, "No such transit request found");

    if (
      transit.requester.storeManaging > 0 &&
      transit.requester.storeManaging !== req.user.storeManaging
    )
      throw new ApiError(
        401,
        "This transit request does not created by your store"
      );

    if (transit.status !== "pending")
      throw new ApiError(400, "Only pending transits can be cancelled");

    if (!cancelReason)
      throw new ApiError(400, "You must add info for the future reference");

    transit.status = "cancelled";
    transit.decidedBy = req.user.id;
    transit.decisionReason = cancelReason;

    await transit.save({ validate: true });

    return res
      .status(200)
      .json(new ApiResponse(200, transit, "Transit request cancelled !!"));
  } catch (err) {
    throw new ApiError(err?.statusCode || 500, err?.message);
  }
});

export const validateTransitRequest = asyncHandler(async (req, res) => {
  const { status, validateInfo } = req.body || {};
  const { transitId } = req.params;

  if (!status || !validateInfo)
    throw new ApiError(
      400,
      "You must add info for the future reference alongwith valid status of request"
    );

  const statusValue = status.toLowerCase();
  if (!["accepted", "declined"].includes(statusValue))
    throw new ApiError(400, "The request can only be accepted or declined");

  try {
    const transit = await Transit.findByPk(transitId);
    if (!transit) throw new ApiError(404, "No such transit request found");

    if (
      req.user.storeManaging > 0 &&
      req.user.storeManaging !== transit.fromStore
    )
      throw new ApiError(400, "You cannot validate this transit request");

    if (transit.status !== "pending")
      throw new ApiError(400, "Only pending transit requests can be validated");

    transit.validatedBy = req.user.id;
    transit.validatedOn = new Date();
    transit.validateInfo = validateInfo;
    transit.status = statusValue;

    await transit.save({ validate: true, silent: true });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { ...transit.toJSON(), validator: req.user },
          "Request decided !!"
        )
      );
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const decideTransitRequest = asyncHandler(async (req, res) => {
  const { status, decisionReason } = req.body || {};
  const { transitId } = req.params;

  if (!status || !decisionReason)
    throw new ApiError(
      400,
      "You must add info for the future reference alongwith status of request"
    );

  const statusValue = status.toLowerCase();

  try {
    const transit = await Transit.findByPk(transitId);
    if (!transit) throw new ApiError(404, "No such transit request found");

    if (!["approved", "rejected"].includes(statusValue))
      throw new ApiError(400, "The request can only be approved or rejected");

    if (["pending", "accepted"].includes(transit.status))
      throw new ApiError(400, "Only pending transit requests can be decided");

    transit.decidedBy = req.user.id;
    transit.decisionReason = decisionReason;
    transit.status = statusValue;

    await transit.save({ validate: true });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { ...transit.toJSON(), decider: req.user },
          "Request decided !!"
        )
      );
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});
