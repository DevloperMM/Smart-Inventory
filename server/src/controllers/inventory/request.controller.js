import { Request, User } from "../../models/index.js";
import { Op } from "sequelize";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import {
  getAssetCategories,
  getConsumableCategories,
} from "../../utils/categories.js";

// Dashboard of user requests
export const getAllRequests = asyncHandler(async (req, res) => {
  try {
    const requests = await Request.findAll({
      where: { status: { [Op.ne]: "cancelled" } },
      include: [
        { model: User, as: "requester" },
        { model: User, as: "decider" },
      ],
    });

    if (requests.length <= 0) throw new ApiError(404, "No requests found");

    return res
      .status(200)
      .json(new ApiResponse(200, requests, "Requests fetched !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

// Display my requests
export const getMyRequests = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  try {
    const requests = await Request.findAll({
      where: { requestedBy: userId },
      include: [{ model: User, as: "decider", attributes: ["name"] }],
    });

    return res
      .status(200)
      .json(new ApiResponse(200, requests, "Requests fetched !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

// Raise new request
export const createRequest = asyncHandler(async (req, res) => {
  const { category, purpose, endUser, storeId } = req.body || {};
  const userRole = req.user.role;

  if (!(category && purpose && storeId))
    throw new ApiError(400, "Please fill the marked fields");

  const [assetCategories, consumableCategories] = await Promise.all([
    getAssetCategories(),
    getConsumableCategories(),
  ]);

  if (
    !assetCategories.includes(category) &&
    !consumableCategories.includes(category)
  )
    throw new ApiError(404, "This category items do not exist in store");

  try {
    const request = await Request.create({
      itemType: assetCategories.includes(category) ? "asset" : "consumable",
      requestedBy: req.user.id,
      storeId,
      category: category.toLowerCase(),
      purpose,
      endUser: endUser || req.user.name,
      status: userRole === "it-head" ? "approved" : "pending",
    });

    if (!request)
      throw new ApiError(
        500,
        "Error occured while creating request! Please try again after sometime!"
      );

    return res
      .status(200)
      .json(new ApiResponse(200, request, `${category} requested`));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

// Cancel my raised request
export const cancelRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const cancelReason = "Request Cancelled";

  try {
    const request = await Request.findByPk(requestId);
    if (!request) throw new ApiError(400, "No such request found");

    if (request.requestedBy !== req.user.id)
      throw new ApiError(401, "You have not created this request");

    if (request.status !== "pending")
      throw new ApiError(400, "Only pending requests can be cancelled");

    if (!cancelReason)
      throw new ApiError(400, "You must add info for the future reference");

    request.status = "cancelled";
    request.decidedBy = req.user.id;
    request.decisionInfo = cancelReason;

    await request.save({ validate: true });

    return res
      .status(200)
      .json(new ApiResponse(200, request, "Request Cancelled !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

// Approve or Reject asset request
export const decideAssetRequest = asyncHandler(async (req, res) => {
  const { status, decisionInfo } = req.body || {};
  const { requestId } = req.params;

  const statusValue = status.toLowerCase();

  try {
    const request = await Request.findByPk(requestId);
    if (!request) throw new ApiError(404, "No such request found");

    if (request.status !== "pending")
      throw new ApiError(400, "Only pending requests can be decided");

    if (!["approved", "rejected"].includes(statusValue))
      throw new ApiError(400, "The request can only be approved or rejected");

    if (!decisionInfo)
      throw new ApiError(
        400,
        "Provide reason to cancel request for future reference"
      );

    request.decidedBy = req.user.id;
    request.decisionInfo = decisionInfo;
    request.status = statusValue;

    await request.save({ validate: true });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { ...request.toJSON(), decider: req.user },
          "Request decided !!"
        )
      );
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

// Approve or Reject consumable request
export const decideConsumableRequest = asyncHandler(async (req, res) => {
  const { status, decisionInfo } = req.body || {};
  const { requestId } = req.params;

  const statusValue = status.toLowerCase();

  try {
    const request = await Request.findByPk(requestId);
    if (!request) throw new ApiError(404, "No such request found");

    if (request.status !== "pending")
      throw new ApiError(400, "Only pending requests can be decided");

    if (
      req.user.storeManaging > 0 &&
      req.user.storeManaging !== request.storeId
    )
      throw new ApiError(400, "You can decide your store requests only");

    if (!["approved", "rejected"].includes(statusValue))
      throw new ApiError(400, "The request can only be approved or rejected");

    if (!decisionInfo)
      throw new ApiError(
        "Provide reason to cancel request for future reference"
      );

    request.decidedBy = req.user.id;
    request.decisionInfo = decisionInfo;
    request.status = statusValue;

    await request.save({ validate: true });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { ...request.toJSON(), decider: req.user },
          "Request Rejected !!"
        )
      );
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});
