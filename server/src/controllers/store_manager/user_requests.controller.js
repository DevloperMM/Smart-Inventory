import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getAllPendingRequests = asyncHandler(async (req, res) => {
  try {
    const requests = await Request.findAll({ where: { status: "Pending" } });
    if (requests.length <= 0) throw new ApiError(404, "No records found");

    return res
      .status(200)
      .json(new ApiResponse(200, requests, "Requests fetched !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const getAllApprovedRequests = asyncHandler(async (req, res) => {
  try {
    const requests = await Request.findAll({ where: { status: "Issued" } });
    if (requests.length === 0) throw new ApiError(404, "No records found");

    return res
      .status(200)
      .json(new ApiResponse(200, requests, "Requests fetched !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const getAllRejectedRequests = asyncHandler(async (req, res) => {
  try {
    const requests = await Request.findAll({ where: { status: "Rejected" } });
    if (requests.length === 0) throw new ApiError(404, "No records found");

    return res
      .status(200)
      .json(new ApiResponse(200, requests, "Requests fetched !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});
