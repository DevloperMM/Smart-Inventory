import { DataTypes } from "sequelize";
import db from "../../lib/db.js";

const Transfer = db.define(
  "Transfer",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "Transits",
        key: "id",
      },
    },
    transferredBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    transferredOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    // Store assetId in array
    assets: {
      type: DataTypes.TEXT,
      get() {
        const rawValue = this.getDataValue("assets");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("assets", JSON.stringify(value));
      },
    },
    // Store consumableId in array
    consumables: {
      type: DataTypes.TEXT,
      get() {
        const rawValue = this.getDataValue("consumables");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("consumables", JSON.stringify(value));
      },
    },
    receivedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    receivedOn: {
      type: DataTypes.DATE,
    },
    status: {
      // Transferred, Received, InTransit
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
);

export default Transfer;
