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
    itemType: {
      type: DataTypes.ENUM("ASSET", "CONSUMABLE"),
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
    alertQty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { paranoid: true, timestamps: true, createdAt: false, updatedAt: false }
);

export default Stock;
