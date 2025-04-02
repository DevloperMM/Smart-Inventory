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
    purchaseDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    mfgBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mfgOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
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
    receiveDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    inWarranty: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    expiryDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    amcVendor: {
      type: DataTypes.STRING,
    },
    enteredBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
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
