import { DataTypes } from "sequelize";
import db from "../../lib/db.js";

const Transit = db.define(
  "Transit",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // array of json objects having category and qty
    request: {
      type: DataTypes.TEXT,
      get() {
        const rawValue = this.getDataValue("request");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("request", JSON.stringify(value));
      },
    },
    fromStore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    toStore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    requestedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    requestedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    approvedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    approvedOn: {
      type: DataTypes.DATE,
    },
    status: {
      // Pending, Cancelled, Rejected, Approved
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
);

export default Transit;
