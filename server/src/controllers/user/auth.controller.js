import User from "../../models/user.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const options = {
  httpOnly: true,
  cookies: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  secure: process.env.NODE_ENV === "production",
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, department } = req.body;

  if (
    [name, email, password, department].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "Fill the mentioned details");
  }

  const mailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!mailRegex.test(email)) {
    throw new ApiError(400, "Enter valid email address");
  }

  const isUserExist = await User.findOne({ where: { email } });
  if (isUserExist) throw new ApiError(409, "This email is already registered");

  const user = await User.create({
    name,
    email,
    password,
    department: department.toUpperCase(),
  });

  if (!user)
    throw new ApiError(
      500,
      "Error occured while registering user! Please try again after sometime!"
    );

  const token = user.generateToken();

  return res
    .status(200)
    .cookie("token", token, options)
    .json(new ApiResponse(200, user, "Registration Successfull!"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password))
    throw new ApiError(400, "Fill the mentioned details");

  const user = await User.findOne({ where: { email } });
  if (!user) throw new ApiError(409, "No such email/user exist");

  const isPassValid = await user.isPasswordCorrect(password);
  if (!isPassValid) throw new ApiError(404, "Invalid credentials");

  const token = user.generateToken();

  return res
    .status(200)
    .cookie("token", token, options)
    .json(new ApiResponse(200, user, "Login successful"));
});

export const logoutUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .clearCookie("token", options)
    .json(new ApiResponse(200, {}, "Logout successful!"));
});
