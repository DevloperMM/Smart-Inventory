import { DataTypes } from "sequelize";
import db from "../lib/db.js";

const Request = db.define(
  "Request",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    endUser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    raisedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    approvedOn: {
      ype: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    approvedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "Pending",
        "Cancelled",
        "Rejected",
        "Issued",
        "Returned"
      ),
      defaultValue: "Pending",
    },
    purpose: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true, paranoid: true }
);

export default Request;

// TODO: Set user's name as default for endUser in controllers (if empty)
