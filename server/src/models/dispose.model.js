import { DataTypes } from "sequelize";
import db from "../lib/db.js";

// TODO: Throw error in case of getting asset and consumable both null

const Disposal = db.define(
  "Disposal",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    condition: {
      type: DataTypes.ENUM("Obsolete", "Retired", "Damaged"),
      allowNull: false,
      defaultValue: "Retired",
    },
    description: {
      type: DataTypes.STRING,
    },
    disposeRaisedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    disposeRaisedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      allowNull: false,
    },
    disposeApprovedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    disposeApprovedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "Pending",
        "Cancelled",
        "Approved",
        "Disposed",
        "Rejected"
      ),
      defaultValue: "Pending",
    },
  },
  { timestamps: true, paranoid: true }
);

export default Disposal;

// TODO: Create auto approved dispose request if create by IT head
