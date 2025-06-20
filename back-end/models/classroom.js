'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classroom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Classroom.hasMany(models.Subject, { foreignKey: 'classroom_id' });
      Classroom.hasMany(models.Student, { foreignKey: 'classroom_id' });
      Classroom.belongsToMany(models.Teacher, {
        through: models.Subject,
        foreignKey: 'classroom_id',
        otherKey: 'teacher_id'
      });
    }
  }
  Classroom.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Classroom',
      tableName: 'classrooms',
      timestamps: true,
      underscored: true,
    }
  );
  return Classroom;
};