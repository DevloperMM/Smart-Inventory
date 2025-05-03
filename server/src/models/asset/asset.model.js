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
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serialNo: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    materialCode: {
      type: DataTypes.STRING,
    },
    pr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    po: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    srr: {
      type: DataTypes.STRING,
      allowNull: false,
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
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amcVendor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    addInfo: {
      type: DataTypes.STRING,
    },
    status: {
      // Available, InTransit, Issued, AMC, Disposed, Sold
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
);

export default Asset;
