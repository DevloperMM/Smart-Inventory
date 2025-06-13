import { DataTypes } from "sequelize";
import db from "../../lib/db.js";

const ConsumableIssuance = db.define(
  "ConsumableIssuance",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    requestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Requests",
        key: "id",
      },
    },
    consumableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Consumables",
        key: "id",
      },
    },
    toAssetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Assets",
        key: "id",
      },
    },
    issuedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    issuedTo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    handledBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    handleInfo: {
      type: DataTypes.STRING,
    },
    status: {
      // Standalone, Embedded, Returned, Exempted
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
);

export default ConsumableIssuance;
