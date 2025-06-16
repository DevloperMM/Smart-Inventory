import { DataTypes } from "sequelize";
import db from "../../lib/db.js";

const ConsumableDisposal = db.define(
  "ConsumableDisposal",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    consumableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Consumables",
        key: "id",
      },
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    isUsed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    condition: {
      type: DataTypes.ENUM("damaged", "retired"),
      allowNull: false,
    },
    raisedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    raisedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    reason: {
      type: DataTypes.STRING,
    },
    decidedOn: {
      type: DataTypes.DATE,
    },
    decidedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    decisionInfo: {
      type: DataTypes.STRING,
    },
    soldOn: {
      type: DataTypes.DATE,
    },
    soldBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    soldInfo: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { paranoid: true, timestamps: true, createdAt: false, updatedAt: false }
);

export default ConsumableDisposal;
