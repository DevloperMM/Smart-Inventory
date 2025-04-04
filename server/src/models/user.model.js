import { DataTypes } from "sequelize";
import db from "../lib/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      min: 6,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("Admin", "IT_Head", "Stock_Manager", "User"),
      defaultValue: "User",
      allowNull: false,
    },
    registeredOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    roleModifiedOn: {
      type: DataTypes.DATE,
    },
  },
  { timestamps: true, paranoid: true }
);

export default User;

// FIXME: approvedBy may or may not have users inside user model
// FIXME: handle registration and approval for user role
