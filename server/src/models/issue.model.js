import { DataTypes } from "sequelize";
import db from "../lib/db.js";

const Issue = db.define(
  "Issue",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    request: {
      type: DataTypes.INTEGER,
      references: {
        model: "Requests",
        key: "id",
      },
    },
    asset: {
      type: DataTypes.INTEGER,
      references: {
        model: "Assets",
        key: "id",
      },
      allowNull: false,
    },
    equipNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    issuedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      allowNull: false,
    },
    issuedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    issuedTo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endUser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    returnedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    returnedTo: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      allowNull: false,
    },
    addInfo: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true, paranoid: true }
);

export default Issue;
