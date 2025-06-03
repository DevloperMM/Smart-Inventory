import { User } from "../../models/index.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const options = {
  httpOnly: true,
  cookies: true,
  sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict",
  secure: process.env.NODE_ENV !== "development",
};

// Login with user details
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};

  if (!(email && password))
    throw new ApiError(400, "Fill the mentioned details");

  const user = await User.findOne({
    where: { email },
    attributes: { include: ["password"] },
    include: [
      { model: User, as: "profileCreator" },
      { model: User, as: "profileUpdator", required: false },
    ],
  });

  if (!user) throw new ApiError(409, "No such user exist");

  const isPassValid = await user.isPasswordCorrect(password);
  if (!isPassValid) throw new ApiError(404, "Invalid credentials");

  const token = user.generateToken();

  return res
    .status(200)
    .cookie("token", token, options)
    .json(new ApiResponse(200, user, "User authenticated !!"));
});

// Logout user profile
export const logoutUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .clearCookie("token", options)
    .json(new ApiResponse(200, {}, "User logged out !!"));
});

// Change old password with new
export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body || {};
  if (!(oldPassword && newPassword))
    throw new ApiError(400, "Please fill the marked fields");

  const user = await User.findByPk(req.user.id, {
    attributes: { include: ["password"] },
  });

  const isPassValid = await user.isPasswordCorrect(oldPassword);
  if (!isPassValid) throw new ApiError(400, "Invalid current password");

  user.password = newPassword;
  await user.save({ validate: true });

  return res.status(200).json(new ApiResponse(200, {}, "Password updated !!"));
});

// Fetch the user profile
export const getProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User profile fetched"));
});
