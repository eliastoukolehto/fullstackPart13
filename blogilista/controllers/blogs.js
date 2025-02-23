const blogsRouter = require('express').Router()
const { Blog, User } = require('../models')
const { tokenExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.findAll({
      include: {
        model: User
      }
    })
    response.json(blogs)
})

blogsRouter.post('/', tokenExtractor, async (request, response) => {
  const body = request.body
  const user = await User.findByPk(request.decodedToken.id)

  const savedBlog = await Blog.create({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
    userId: user.id
  })

  response.status(201).json(savedBlog) 
})

blogsRouter.delete('/:id', tokenExtractor, async (request, response) => {
  const user = await User.findByPk(request.decodedToken.id)
  const blog = await Blog.findByPk(request.params.id)

  if (blog.userId === user.id) {
    await blog.destroy()
    response.status(204).end()
  } else {
    response.status(401).end()
  }
  
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = await Blog.findByPk(request.params.id)
  if (blog) {
  blog.set({...body})
  const updatedBlog = await blog.save()
  response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter