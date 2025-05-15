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
    issuedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    issuedTo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    returnedOn: {
      type: DataTypes.DATE,
    },
    returnedTo: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    returnInfo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      // Consumed, Integrated, Returned, Exempted
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
);

export default ConsumableIssuance;
