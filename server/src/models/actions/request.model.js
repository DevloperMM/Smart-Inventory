import { DataTypes } from "sequelize";
import db from "../../lib/db.js";

const Request = db.define(
  "Request",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
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
    purpose: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    raisedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    approvedOn: {
      type: DataTypes.DATE,
    },
    approvedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    approvalComments: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("pending", "cancelled", "rejected", "approved"),
      defaultValue: "pending",
    },
  },
  { timestamps: true, paranoid: true }
);

export default Request;
