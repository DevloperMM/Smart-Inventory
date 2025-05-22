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
    condition: {
      // Damaged, Retired
      type: DataTypes.STRING,
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
    approvedOn: {
      type: DataTypes.DATE,
    },
    approvedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
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
    status: {
      // Pending, Cancelled, Rejected, Disposed, Sold
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { paranoid: true, timestamps: true, createdAt: false, updatedAt: false }
);

export default ConsumableDisposal;
