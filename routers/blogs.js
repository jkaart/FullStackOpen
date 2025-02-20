const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body
  if (!title || !url) {
    return response.status(400).end()
  }
  const blog = new Blog({
    title,
    author,
    url,
    likes: !likes ? 0 : likes,
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  const deletedBlog = await Blog.findByIdAndDelete(id)
  if (!deletedBlog) {
    return response.status(404).end()
  }

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const id = request.params.id

  if (!title || !author || !url || !likes) {
    return response.status(400).end()
  }

  const blog = {
    title,
    author,
    url,
    likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })

  if (!updatedBlog) {
    return response.status(404).end()
  }

  response.status(201).json(updatedBlog)
})

module.exports = blogsRouter
