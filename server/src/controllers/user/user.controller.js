import { User } from "../../models/index.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

// Dashboard of users profile
export const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        { model: User, as: "profileCreator" },
        { model: User, as: "profileUpdator" },
      ],
    });

    if (users.length <= 0) throw new ApiError(404, "No users found");

    return res
      .status(200)
      .json(new ApiResponse(200, users, "Users fetched !!"));
  } catch (err) {
    throw new ApiError(err?.statusCode || 500, err?.message);
  }
});

// Create new user
export const createUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    department,
    empCode,
    role,
    storeManaging,
    extension,
  } = req.body || {};

  if (
    !empCode ||
    [name, email, password, department, role].some(
      (field) => field?.trim() === ""
    )
  )
    throw new ApiError(400, "Please fill the marked fields");

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

    if (role.toLowerCase() === "store-manager" && !storeManaging)
      throw new ApiError(400, "Please assign valid store");

    const username = name.split(" ")[0].toLowerCase() + empCode;

    const user = await User.create({
      name,
      email,
      empCode,
      password,
      username,
      extension,
      department: department?.toUpperCase(),
      role: role?.toLowerCase(),
      profileCreatedBy: req.user.id,
      profileCreatedOn: new Date(),
      ...(storeManaging && { storeManaging }),
    });

    if (!user)
      throw new ApiError(
        500,
        "Error occured while registering user! Please try again after sometime!"
      );

    return res.status(200).json(new ApiResponse(200, user, "User created !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

// Display user profile
export const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      include: [
        { model: User, as: "profileCreator" },
        { model: User, as: "profileUpdator" },
      ],
    });

    if (!user) throw new ApiError(404, "No such user found");
    return res.status(200).json(new ApiResponse(200, user, "User fetched !!"));
  } catch (err) {
    throw new ApiError(err?.statusCode || 500, err?.message);
  }
});

// Update user details
export const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const details = req.body || {};

  const allowedFields = [
    "name",
    "email",
    "role",
    "department",
    "password",
    "storeManaging",
    "extension",
    "empCode",
  ];

  const invalidFields = Object.keys(details).filter(
    (field) => !allowedFields.includes(field)
  );

  if (invalidFields.length > 0)
    throw new ApiError(400, `Non-upgradable fields provided`);

  for (const field of Object.keys(details)) {
    const value = details[field];
    if (
      field !== "extension" &&
      typeof value === "string" &&
      value.trim() === ""
    ) {
      throw new ApiError(400, `Please fill the marked fields`);
    }
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) throw new ApiError(404, "No such user found");

    let changesMade = false;
    let changeUsername = false;

    Object.keys(details).forEach((key) => {
      let value = details[key];
      value = typeof value === "string" ? value.trim() : value;
      if (allowedFields.includes(key)) {
        if (user[key] !== value) {
          changesMade = true;
          if (key === "role") {
            const roleValue = value.toLowerCase();
            user[key] = roleValue;
            if (roleValue !== "store-manager") user.storeManaging = 0;
          } else if (["name", "empCode"].includes(key)) {
            changeUsername = true;
            user[key] = value;
          } else if (key === "department") user[key] = value.toUpperCase();
          else user[key] = value;
        }
      } else {
        throw new ApiError(400, "Details with user identity can't be changed");
      }
    });

    if (!changesMade) throw new ApiError(400, "No update has been made");

    user.profileUpdatedOn = new Date();
    user.profileUpdatedBy = req.user.id;

    if (changeUsername)
      user.username = user.name.split(" ")[0].toLowerCase() + user.empCode;

    await user.save({ validate: true });

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Profile details updated !!"));
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err?.message);
  }
});

// Delete any active user
export const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user) throw new ApiError(404, "No such active user found");

    await user.destroy();

    return res.status(200).json(new ApiResponse(200, {}, "User deleted !!"));
  } catch (err) {
    throw new ApiError(err?.statusCode || 500, err?.message);
  }
});
