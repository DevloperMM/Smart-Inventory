import { DataTypes } from "sequelize";
import db from "../../lib/db.js";

const AssetIssuance = db.define(
  "AssetIssuance",
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
    assetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Assets",
        key: "id",
      },
    },
    equipNo: {
      type: DataTypes.STRING(10),
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
      // Issued, Returned, Exempted
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
);

export default AssetIssuance;
