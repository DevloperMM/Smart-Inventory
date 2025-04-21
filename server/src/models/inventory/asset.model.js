import { DataTypes } from "sequelize";
import db from "../../lib/db.js";

const Asset = db.define(
  "Asset",
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
    mfgBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelNo: {
      type: DataTypes.STRING,
    },
    serialNo: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    pr: {
      type: DataTypes.FLOAT,
    },
    po: {
      type: DataTypes.FLOAT,
    },
    grn: {
      type: DataTypes.FLOAT,
    },
    srr: {
      type: DataTypes.FLOAT,
    },
    location: {
      type: DataTypes.ENUM("HRD", "CRD"),
      allowNull: false,
      defaultValue: "HRD",
    },
    stockedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    stockedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    inWarranty: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    amcVendor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiryOn: {
      type: DataTypes.DATE,
    },
    addInfo: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM(
        "Available",
        "Issued",
        "Vendored",
        "Disposed",
        "Sold"
      ),
      defaultValue: "Available",
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
);

export default Asset;
