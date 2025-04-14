import { DataTypes } from "sequelize";
import db from "../lib/db.js";

// TODO: Controllers add to show different categories

const Stock = db.define(
  "Stock",
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
    activeQty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alertQty: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM("In stock", "Low stock", "Out of stock"),
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
);

export default Stock;
