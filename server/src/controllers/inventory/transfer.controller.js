import { Transfer, User } from "../../models/index.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getTranferRecords = asyncHandler(async (req, res) => {
  try {
    const transfers = await Transfer.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        { model: User, as: "sender" },
        { model: User, as: "receiver" },
      ],
    });

    if (transfers.length <= 0) throw new ApiError(404, "No transfers found");

    return res
      .status(200)
      .json(new ApiResponse(200, transfers, "Transit Requests fetched !!"));
  } catch (err) {
    console.log(err);
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const createTransfer = asyncHandler(async (req, res) => {});

export const receiveTransfer = asyncHandler(async (req, res) => {
  const { transferId } = req.params;
  // can we take transit id using query strings

  try {
    const tranfer = await Transit.findByPk(transferId);
    if (!tranfer) throw new ApiError(404, "No such transfer found");

    if (tranfer.requestedBy !== req.user.id)
      throw new ApiError(401, "You have not created this transit request");

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
