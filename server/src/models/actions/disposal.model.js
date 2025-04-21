import { DataTypes } from "sequelize";
import db from "../../lib/db.js";

// TODO: Throw error in case of getting asset and consumable both null
// TODO: If get asset to dispose, make sure to dispose all consumables against it

const Disposal = db.define(
  "Disposal",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    itemType: {
      type: DataTypes.ENUM("Asset", "Consumable"),
      allowNull: false,
      defaultValue: "Asset",
    },
    assetId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Assets",
        key: "id",
      },
    },
    consumableId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Consumables",
        key: "id",
      },
    },
    condition: {
      type: DataTypes.ENUM("Obsolete", "Damaged"),
      allowNull: false,
    },
    description: {
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
    status: {
      type: DataTypes.ENUM("Pending", "Cancelled", "Approved", "Rejected"),
      defaultValue: "Pending",
    },
  },
  { timestamps: true, paranoid: true }
);

export default Disposal;
