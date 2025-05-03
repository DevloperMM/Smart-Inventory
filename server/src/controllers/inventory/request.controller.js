import { Request } from "../../models";
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";

export const getAllRequests = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { status } = req.query;
  try {
    const whereClause = { userId };
    if (status) whereClause.status = status.toLowerCase();

    const requests = await Request.findAll({ where: whereClause });

    if (requests.length <= 0) throw new ApiError(404, "No requests found");

    return res
      .status(200)
      .json(new ApiResponse(200, requests, "Requests fetched !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const createRequest = asyncHandler(async (req, res) => {
  const { category, purpose, endUser } = req.body;
  if (!(category && purpose))
    throw new ApiError(400, "Fill the required fields");

  try {
    const request = await Request.create({
      user: req.user.id,
      endUser: endUser || req.user.name,
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
      .json(new ApiResponse(200, request, `${category} requested`));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const cancelRequest = asyncHandler(async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Request.findByPk(requestId);
    if (!request) throw new ApiError(400, "No such request found");

    if (request.user !== req.user.id)
      throw new ApiError(
        401,
        "Request can only be cancelled if you created it"
      );

    if (request.status !== "pending")
      throw new ApiError(
        400,
        "Request can only be cancelled if it is still pending"
      );

    await request.update({ status: "cancelled" });

    return res
      .status(200)
      .json(new ApiResponse(200, request, "Request Cancelled !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});
