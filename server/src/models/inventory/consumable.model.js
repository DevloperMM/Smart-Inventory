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
    trackingNo: {
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
    amcVendor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.ENUM("HRD", "CRD"),
      allowNull: false,
      defaultValue: "HRD",
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
    addInfo: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true, paranoid: true }
);

export default Consumable;
