import { DataTypes } from "sequelize";
import db from "../lib/db.js";

const Consumable = db.define(
  "Consumable",
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
    specs: {
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
    },
    mfgOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    uniqueNo: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    grn: {
      type: DataTypes.FLOAT,
      allowNull: false,
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
    expiryDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    location: {
      type: DataTypes.ENUM("HRD", "CRD"),
      allowNull: false,
      defaultValue: "HRD",
    },
    issuedToAsset: {
      type: DataTypes.INTEGER,
      references: {
        model: "Asset",
        key: "id",
      },
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

export default Consumable;
