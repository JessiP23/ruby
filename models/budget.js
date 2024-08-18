'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Budget extends Model {
    static associate(models) {
      // Define associations here
      Budget.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Budget.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    }
  }
  Budget.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // This should match the table name in the database
        key: 'id',
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Categories', // This should match the table name in the database
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Budget',
  });
  return Budget;
};
