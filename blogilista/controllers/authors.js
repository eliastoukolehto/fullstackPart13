const authorsRouter = require('express').Router()
const { Blog, User } = require('../models')
const { sequelize } = require('../utils/db')

authorsRouter.get('/', async (request, response) => {

  const authors = await Blog.findAll({
    group: 'author',
    attributes: [
      'author', 
      [sequelize.fn('COUNT', sequelize.col('id')),'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')),'likes'],
    ],
    order:[
      ['likes', 'DESC'],
    ]
  })
  response.json(authors)
})

module.exports = authorsRouter