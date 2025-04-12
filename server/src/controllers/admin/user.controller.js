import User from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getUsers = asyncHandler(async (req, res) => {
  try {
    const records = await User.findAll();

    if (records.length <= 0) throw new ApiError(404, "No users found");

    return res
      .status(200)
      .json(new ApiResponse(200, records, "Users fetched !!"));
  } catch (err) {
    throw new ApiError(err?.statusCode || 500, err?.message);
  }
});

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, department, role } = req.body;

  if (
    [name, email, password, department, role].some(
      (field) => field?.trim() === ""
    )
  )
    throw new ApiError(400, "Fill the mentioned details");

  const mailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!mailRegex.test(email))
    throw new ApiError(400, "Enter valid email address");

  try {
    const isUserExist = await User.findOne({ where: { email } });
    if (isUserExist)
      throw new ApiError(409, "This email is already registered");

    const user = await User.create({
      name,
      email,
      password,
      department: department.toUpperCase(),
      role: role.toUpperCase(),
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
  const { id } = req.params;
  const { role, department, password } = req.body;

  if ([role, password, department].some((field) => field?.trim() === ""))
    throw new ApiError(400, "Fill the mentioned details");

  try {
    const user = await User.findByPk(id);

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
    res.status(200).json(new ApiResponse(200, {}, "User deleted !!"));
  } catch (err) {
    throw new ApiError(err?.statusCode || 500, err?.message);
  }
});
