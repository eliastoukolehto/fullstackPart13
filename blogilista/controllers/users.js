bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const { User, Blog } = require('../models')
const { Op } = require('sequelize')

usersRouter.get('/', async (request, response) => {
  const users = await User.findAll({
    include: {
      model: Blog
    }
  })
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  let where = {}

  if (request.query.read) {
    where = {
      read: {
        [Op.eq]: request.query.read
      }
    }
  }

  const user = await User.findByPk(request.params.id, {
    attributes: { exclude: ['password'] },
    include:[{
      model: Blog,
      as: 'readings',
      attributes: { exclude: ['userId']},
      through: {
        attributes: ['read', 'id'],
        where
      },
    }],
  })
  response.json(user)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    if (!password || password.length < 3) {
        return response.status(400).json({ error: 'invalid password' })
    }

    const rounds = 10
    const passwordHash = await bcrypt.hash(password, rounds)

    const savedUser = await User.create({
        name: name,
        username: username,
        password: passwordHash
    })
    response.status(201).json(savedUser)
})

usersRouter.put('/:username', async (request, response) => {
    const body = request.body
    const user = await User.findOne({ where: { username: request.params.username }})
    if (user) {
        user.set({ username: body.username })
        const updatedUser = await user.save()
        response.json(updatedUser)
    } else {
        response.status(404).end()
    }
})


module.exports = usersRouter