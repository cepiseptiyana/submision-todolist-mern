"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Todo belongTo Category
      Todo.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      completed: DataTypes.BOOLEAN,
      category_id: DataTypes.INTEGER,
      priority: DataTypes.STRING,
      due_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
