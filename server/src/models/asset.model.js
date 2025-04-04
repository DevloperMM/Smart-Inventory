import { DataTypes } from "sequelize";
import db from "../lib/db.js";

const Asset = db.define(
  "Asset",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pr: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    po: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    purchasedOn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    mfgBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mfgOn: {
      type: DataTypes.DATE,
    },
    modelNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serialNo: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    grn: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    location: {
      type: DataTypes.ENUM("HRD", "CRD"),
      allowNull: false,
      defaultValue: "HRD",
    },
    srr: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stockedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    inWarranty: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    amcVendor: {
      type: DataTypes.STRING,
    },
    expiryOn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    enteredBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      allowNull: false,
    },
    addInfo: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("Available", "Issued", "Disposed"),
      defaultValue: "Available",
    },
  },
  { timestamps: true, paranoid: true }
);

export default Asset;
