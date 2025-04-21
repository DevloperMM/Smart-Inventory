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
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    consumableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Consumables",
        key: "id",
      },
    },
    toEquipNo: {
      type: DataTypes.STRING,
      allowNull: false,
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
    status: {
      type: DataTypes.ENUM("Issued", "Raised-Return", "Returned", "Exempted"),
      allowNull: false,
      defaultValue: "Issued",
    },
    addInfo: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true, paranoid: true }
);

export default ConsumableIssuance;
