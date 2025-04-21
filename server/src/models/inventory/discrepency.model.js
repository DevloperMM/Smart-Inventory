import { DataTypes } from "sequelize";
import db from "../../lib/db.js";

const Discrepency = db.define(
  "Discrepency",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tallyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Discrepencies",
        key: "id",
      },
    },
    itemType: {
      type: DataTypes.ENUM("Asset", "Consumable"),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    identifyNo: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    addInfo: {
      type: DataTypes.STRING,
    },
    isFixed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    declaration: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("Extra", "Missing"),
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
);

Discrepency.beforeUpdate(async (discrepency) => {
  if (discrepency.isFixed) {
    const wordCount = discrepency.declaration.trim().split(/\s+/).length;
    if (wordCount < 100)
      throw new ApiError(402, "Declaration needed of atleast 100 words");
  }
});

export default Discrepency;
