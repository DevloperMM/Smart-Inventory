import { DataTypes } from "sequelize";
import db from "../lib/db.js";

const Requirement = db.define(
  "Requirement",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pr: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    requestedQty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    approvedQty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isUrgent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    raisedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
      allowNull: false,
    },
    raisedOn: {
      type: DataTypes.DATE,
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
    approvedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    isTransit: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Cancelled", "Rejected", "Approved"),
      allowNull: false,
      defaultValue: "Pending",
    },
    addInfo: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true, paranoid: true }
);

export default Requirement;
