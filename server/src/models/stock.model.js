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
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("In stock", "Low stock", "Out of stock"),
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
);

export default Stock;
