import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  console.log("User fetched successfully");
  return res.json(user.dataValues);
});

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const record = await User.create({ name, email, password });

  console.log("User created successfully");
  return res.json(record.dataValues);
});
