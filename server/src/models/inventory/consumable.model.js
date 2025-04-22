import { DataTypes } from "sequelize";
import db from "../../lib/db.js";

const Consumable = db.define(
  "Consumable",
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
    specs: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mfgBy: {
      type: DataTypes.STRING,
    },
    identifyNo: {
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
    expiryOn: {
      type: DataTypes.DATE,
    },
    amcVendor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.ENUM("HRD", "CRD"),
      allowNull: false,
      defaultValue: "HRD",
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
      allowNull: false,
      defaultValue: "Available",
    },
  },
  { timestamps: true, paranoid: true }
);

export default Consumable;
