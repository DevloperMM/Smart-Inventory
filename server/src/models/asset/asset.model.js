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
    },
    po: {
      type: DataTypes.STRING,
    },
    grn: {
      type: DataTypes.STRING,
    },
    srr: {
      type: DataTypes.STRING,
    },
    stockedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    inWarranty: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
    },
    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    addInfo: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
);

export default Asset;
