const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

var currentYear = new Date().getFullYear()

class Blog extends Model {}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
      type: DataTypes.TEXT,
      allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: { args: 1991, msg: 'year must be above 1991'},
      max: { args: Number(currentYear), msg: 'year must be at most the current year'}
    }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

module.exports = Blog