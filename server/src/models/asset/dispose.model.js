import { DataTypes } from "sequelize";
import db from "../../lib/db.js";

const AssetDisposal = db.define(
  "AssetDisposal",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    assetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Assets",
        key: "id",
      },
    },
    condition: {
      type: DataTypes.ENUM("Retired", "Obsolete"),
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
  { timestamps: true, paranoid: true }
);

export default AssetDisposal;
