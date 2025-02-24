const { DataTypes } = require('sequelize')

var currentYear = new Date().getFullYear()

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: { args: 1991, msg: 'year must be above 1991'},
        max: { args: Number(currentYear), msg: 'year must be at most the current year'}
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  }
}