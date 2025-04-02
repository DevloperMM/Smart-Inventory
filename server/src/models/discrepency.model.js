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
        model: "User",
        key: "id",
      },
      allowNull: false,
    },
    asset: {
      type: DataTypes.INTEGER,
      references: {
        model: "Asset",
        key: "id",
      },
    },
    consumable: {
      type: DataTypes.INTEGER,
      references: {
        model: "Consumable",
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
