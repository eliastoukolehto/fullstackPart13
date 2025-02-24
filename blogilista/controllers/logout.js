const { Token } = require('../models')
const { tokenExtractor } = require('../utils/middleware')

const logoutRouter = require('express').Router()

logoutRouter.delete('/', tokenExtractor, async (request, response) => {
  await Token.destroy({
    where: {
      userId: request.decodedToken.id
    }
  })
  response.status(204).end()
})

module.exports = logoutRouter