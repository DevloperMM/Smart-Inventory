import { User } from "../../models/index.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.findAll({});

    if (users.length <= 0) throw new ApiError(404, "No users found");

    return res
      .status(200)
      .json(new ApiResponse(200, users, "Users fetched !!"));
  } catch (err) {
    throw new ApiError(err?.statusCode || 500, err?.message);
  }
});

export const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);

    if (!user) throw new ApiError(404, "No such user found");
    return res.status(200).json(new ApiResponse(200, user, "User fetched !!"));
  } catch (err) {
    throw new ApiError(err?.statusCode || 500, err?.message);
  }
});

export const createUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    department,
    empCode,
    role = "User",
    storeId = 1,
  } = req.body;

  if (
    [name, email, password, department, role, empCode].some(
      (field) => field?.trim() === ""
    )
  )
    throw new ApiError(400, "Fill the mentioned details");

  const mailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!mailRegex.test(email))
    throw new ApiError(400, "Enter valid email address");

  try {
    const isEmailExist = await User.findOne({ where: { email } });
    if (isEmailExist)
      throw new ApiError(409, "This email is already registered");

    const isEmpCodeExist = await User.findOne({ where: { empCode } });
    if (isEmpCodeExist)
      throw new ApiError(409, "This employee code is already registered");

    if (role?.toLowerCase() == "store-manager" && !storeId)
      throw new ApiError(400, "Please assign valid store");

    const user = await User.create({
      name,
      email,
      password,
      department: department,
      role: role,
      empCode,
      storeManaging: storeId,
      profileCreatedBy: req.user.id,
      profileUpdatedBy: req.user.id,
      profileUpdatedOn: new Date(),
    });

    if (!user)
      throw new ApiError(
        500,
        "Error occured while registering user! Please try again after sometime!"
      );

    return res
      .status(200)
      .json(new ApiResponse(200, user, `User created wih ${user.role} !!`));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { role, department, password } = req.body;

  if ([role, password, department].some((field) => field?.trim() === ""))
    throw new ApiError(400, "Fill the mentioned details");

  try {
    const user = await User.findByPk(userId);

    if (role) user.role = role.toUpperCase();
    if (department) user.department = department.toUpperCase();
    if (password) user.password = password;

    user.profileUpdatedOn = new Date();
    user.profileUpdatedBy = req.user.id;
    await user.save({ validate: true });

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Profile details updated !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await User.destroy({ where: { id } });
    return res.status(200).json(new ApiResponse(200, {}, "User deleted !!"));
  } catch (err) {
    throw new ApiError(err?.statusCode || 500, err?.message);
  }
});
