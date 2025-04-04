import { DataTypes } from "sequelize";
import db from "../lib/db.js";

const PeriodicCheck = db.define(
  "PeriodicCheck",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    checkedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    checkedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      references: {
        model: "Stocks",
        key: "id",
      },
    },
    isDisposable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: true, paranoid: true }
);

export default PeriodicCheck;
