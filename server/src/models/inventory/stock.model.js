import { DataTypes } from "sequelize";
import db from "../../lib/db.js";

const Stock = db.define(
  "Stock",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM("Asset", "Consumable"),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activeQty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alertQty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      // InStock, LowStock, OutStock
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { paranoid: true, timestamps: true, createdAt: false, updatedAt: false }
);

export default Stock;
