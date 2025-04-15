import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import User from "../../models/user.model.js";
import Request from "../../models/request.model.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const getAllRequests = asyncHandler(async (req, res) => {
  try {
    const requests = await Request.findAll({ where: { user: req.user.id } });
    if (requests.length === 0) throw new ApiError(404, "No records found");

    return res
      .status(200)
      .json(new ApiResponse(200, requests, "Requests fetched !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const createRequest = asyncHandler(async (req, res) => {
  try {
    const { category, purpose, endUser } = req.body;
    if (!(category && purpose))
      throw new ApiError(400, "Fill the required fields");

    const user = await User.findByPk(req.user.id);
    const request = await Request.create({
      user: user.id,
      endUser: endUser || user.name,
      category,
      purpose,
    });

    if (!request)
      throw new ApiError(
        500,
        "Error occured while creating request! Please try again after sometime!"
      );

    return res
      .status(200)
      .json(new ApiResponse(200, request, "IT Equipment requested"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const cancelRequest = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const request = await Request.findByPk(id);
    if (!request) throw new ApiError(400, "No such request found");

    if (request.user !== req.user.id)
      throw new ApiError(
        401,
        "Request can only be cancelled if you created it"
      );

    if (request.status !== "Pending")
      throw new ApiError(
        400,
        "Request can only be cancelled if it is still pending"
      );

    await request.update({ status: "Cancelled" });

    return res.status(200).json(new ApiResponse(200, {}, "Request Cancelled"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});
