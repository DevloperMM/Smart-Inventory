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
    },
    mfgBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mfgOn: {
      type: DataTypes.DATE,
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
    stockedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    expiryOn: {
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
        model: "Assets",
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
