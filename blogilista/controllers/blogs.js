const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')
const user = require('../models/user')
const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL)

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
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})
Blog.sync()


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.findAll()
    response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {

  const body = request.body
  console.log(body)

  savedBlog = await Blog.create({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  })

  response.status(201).json(savedBlog) 
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user

  const blog = await Blog.findByPk(request.params.id)

  await blog.destroy()
  response.status(204).end()
  
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter