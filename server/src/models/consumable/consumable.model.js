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
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isUsed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    updatedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    amcVendor: {
      type: DataTypes.STRING,
    },
    status: {
      // Store, Vendor
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
);

export default Consumable;
