import { DataTypes } from "sequelize";
import db from "../../lib/db.js";
import ApiError from "../../utils/ApiError.js";

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
    // Store assetId in array
    assets: {
      type: DataTypes.TEXT,
      defaultValue: "[]",
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
      defaultValue: "[]",
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
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
);

Transfer.beforeCreate((transfer) => {
  const assets = JSON.parse(transfer.assets || "[]");
  const consumables = JSON.parse(transfer.consumables || "[]");

  if (
    (!assets || assets.length === 0) &&
    (!consumables || consumables.length === 0)
  )
    throw new ApiError(
      402,
      "Atleast one consumable or asset should be there to transfer"
    );
});

export default Transfer;
