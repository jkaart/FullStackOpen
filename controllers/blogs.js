const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(404).json({ error: 'any user not found' })
  }
  const { title, author, url, likes } = request.body
  if (!title || !url) {
    return response.status(400).end()
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: !likes ? 0 : likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

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
