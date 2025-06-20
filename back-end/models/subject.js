'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subject.belongsTo(models.Teacher, { foreignKey: 'teacher_id' });
      Subject.belongsTo(models.Classroom, { foreignKey: 'classroom_id' });
    }
  }
  Subject.init({
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
    semester: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    subject_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // SET NULL needs allowNull: true
      references: {
        model: 'teachers', // ✅ fixed
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    classroom_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // SET NULL needs allowNull: true
      references: {
        model: 'classrooms', // ✅ fixed
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
  }, {
    sequelize,
    modelName: 'Subject',
    tableName: 'Subjects',
    timestamps: true,
    underscored: true,
  });
  return Subject;
};