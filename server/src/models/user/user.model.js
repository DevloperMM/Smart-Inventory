import { DataTypes } from "sequelize";
import db from "../../lib/db.js";
import ApiError from "../../utils/ApiError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    empCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    extension: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "User",
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    storeManaging: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    profileCreatedOn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    profileCreatedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      allowNull: false,
      onUpdate: "CASCADE",
    },
    profileUpdatedOn: {
      type: DataTypes.DATE,
    },
    profileUpdatedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
    },
  },
  {
    paranoid: true,
    timestamps: true,
    createdAt: false,
    updatedAt: false,
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
  }
);

User.beforeCreate(async (user) => {
  if (user.password && user.password.length > 5) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  } else {
    throw new ApiError(402, "Password should have atleast 6 characters");
  }
});

User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    if (user.password.length > 5) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    } else {
      throw new ApiError(402, "Password should have at least 6 characters");
    }
  }
});

User.prototype.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
};

export default User;
