"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Accounts extends Model {
    static associate(models) {
      Accounts.belongsTo(models.Users, {
        as: "accounts",
        foreignKey: "userId",
      });
    }
  }
  Accounts.init(
    {
      ifsc: DataTypes.STRING,
      number: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Accounts",
    }
  );
  return Accounts;
};
