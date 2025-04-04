import { DataTypes } from "sequelize";
import db from "../lib/db.js";

// TODO: Throw error in case of getting asset and consumable both null

const Discrepency = db.define(
  "Discrepency",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reportedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    reportedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      allowNull: false,
    },
    asset: {
      type: DataTypes.INTEGER,
      references: {
        model: "Assets",
        key: "id",
      },
    },
    consumable: {
      type: DataTypes.INTEGER,
      references: {
        model: "Consumables",
        key: "id",
      },
    },
    addInfo: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("Extra", "Missing"),
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
);

export default Discrepency;
