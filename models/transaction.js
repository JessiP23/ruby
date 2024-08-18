'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.User, {foreignKey: 'userId'});
      Transaction.belongsTo(models.Category, {foreignKey: 'categoryId'});
    }
  }
  Transaction.init({
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};