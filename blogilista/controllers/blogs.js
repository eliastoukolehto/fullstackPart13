const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.findAll()
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

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

blogsRouter.delete('/:id', async (request, response) => {

  const blog = await Blog.findByPk(request.params.id)

  await blog.destroy()
  response.status(204).end()
  
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = await Blog.findByPk(request.params.id)
  if (blog) {
  blog.set({...body})
  updatedBlog = await blog.save()
  response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter