const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body
  if (!title || !url) {
    return response.status(400).end()
  }

  const user = request.user

  const blog = new Blog({
    title,
    author,
    url,
    likes: !likes ? 0 : likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const returnBlog = await Blog
    .findById(savedBlog._id)
    .populate('user', { username: 1, name: 1 })
  response.status(201).json(returnBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const id = request.params.id
  const user = request.user

  const blog = await Blog.findById(id).populate('user')
  if (!blog) {
    return response.status(404).end()
  }
  if (blog.user.id.toString() !== user.id.toString()) {
    return response.status(401).end()
  }
  await Blog.findByIdAndDelete(id)

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

blogsRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body
  const id = request.params.id
  const blog = await Blog.findById(id).populate('user', { username: 1, name: 1 })

  if (!blog) {
    return response.status(404).end()
  }

  blog.comments = blog.comments.concat(comment)

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter
