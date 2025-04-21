import { DataTypes } from "sequelize";
import db from "../../lib/db.js";

const Tally = db.define(
  "Tally",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    checkedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    checkedBy: {
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

export default Tally;
