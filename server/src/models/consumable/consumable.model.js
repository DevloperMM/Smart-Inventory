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
    newQty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usedQty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  },
  { paranoid: true, timestamps: true, createdAt: false, updatedAt: false }
);

export default Consumable;
