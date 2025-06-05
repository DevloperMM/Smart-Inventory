import { DataTypes } from "sequelize";
import db from "../../lib/db.js";

const Transit = db.define(
  "Transit",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // array of json objects having category and qty
    items: {
      type: DataTypes.TEXT,
      get() {
        const rawValue = this.getDataValue("items");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("items", JSON.stringify(value));
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fromStore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    toStore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    requestedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    decidedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    decisionReason: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
);

export default Transit;
