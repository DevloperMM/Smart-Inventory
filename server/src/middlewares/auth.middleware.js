import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/index.js";

const verifyAuth = asyncHandler(async (req, _res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) throw new ApiError(401, "No token found !!");
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findByPk(decodedToken?.id);
    if (!user) throw new ApiError(401, "Token expired !!");

    req.user = user;
    next();
  } catch (err) {
    throw new ApiError(401, err?.message || "Token forged !!");
  }
});

export default verifyAuth;
