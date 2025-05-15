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
      defaultValue: 1,
    },
    status: {
      // InStock, LowStock, OutStock
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
);

export default Stock;
