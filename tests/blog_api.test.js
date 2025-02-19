const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')
const { title } = require('node:process')

const api = supertest(app)

describe('API tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(listHelper.initialBlogs)
  })

  test('blogs are returned as JSON', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, listHelper.initialBlogs.length)
  })

  test('returned unique identifier property is id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    response.body.forEach(blog => {
      assert.strictEqual(Object.keys(blog).includes('id'), true)
    })
  })

  test('can add blog to the db', async () => {
    const newBlog = {
      title: 'Test blog',
      author: 'Test Tester',
      url: 'http://testblog.org',
      likes: 5,
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const allBlogs = await Blog.find({})
    const result = await Blog.findById(response.body.id)
    const savedBlog = {
      title: result.title,
      author: result.author,
      url: result.url,
      likes: result.likes,
      id: result.id
    }
    
    assert.strictEqual(allBlogs.length, listHelper.initialBlogs.length + 1)
    assert.deepStrictEqual(savedBlog, { ...newBlog, id: response.body.id })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})

