import User from "../../models/user.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const options = {
  httpOnly: true,
  cookies: true,
  sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict",
  secure: process.env.NODE_ENV !== "development",
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, department, empCode } = req.body;

  if ([name, email, password, department].some((field) => field?.trim() === ""))
    throw new ApiError(400, "Fill the mentioned details");

  const mailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!mailRegex.test(email))
    throw new ApiError(400, "Enter valid email address");

  const isUserExist = await User.findOne({ where: { email } });
  if (isUserExist) throw new ApiError(409, "This email is already registered");

  const isEmpCodeExist = await User.findOne({ where: { empCode } });
  if (isEmpCodeExist)
    throw new ApiError(409, "This employee code is already registered");

  const user = await User.create({
    name,
    email,
    password,
    department: department.toUpperCase(),
    empCode,
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
    .json(new ApiResponse(200, user, "User Registered !!"));
});

// We can give either mail or empCode option to login user
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
    .json(new ApiResponse(200, user, "User authenticated !!"));
});

export const logoutUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .clearCookie("token", options)
    .json(new ApiResponse(200, {}, "User logged out !!"));
});

export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!(oldPassword && newPassword))
    throw new ApiError(400, "Fill the required fields");

  const user = await User.findByPk(req.user.id);
  const isPassValid = await user.isPasswordCorrect(oldPassword);

  if (!isPassValid) throw new ApiError(400, "Enter valid current password");

  user.password = newPassword;
  await user.save({ validate: true });

  return res.status(200).json(new ApiResponse(200, {}, "Password updated !!"));
});
