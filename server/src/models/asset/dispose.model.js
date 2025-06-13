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
      type: DataTypes.ENUM("retired", "obsolete", "damaged"),
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

export default AssetDisposal;
