const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')

const api = supertest(app)

describe('API tests', async () => {
  describe('for multiple blog init', async () => {
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
  })

  describe('adding new blog', async () => {
    test('new blog adding succeeds', async () => {
      const newBlog = { ...listHelper.singleBlog }

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

    test('success if likes is undefined set it to zero', async () => {
      const newBlog = { ...listHelper.singleBlog }
      delete newBlog.likes

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.likes, 0)
    })

    test('failing with status 400 if title is undefined', async () => {
      const newBlog = { ...listHelper.singleBlog }
      delete newBlog.title

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })

    test('failing with status 400 if url is undefined', async () => {
      const newBlog = { ...listHelper.singleBlog }
      delete newBlog.url

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
  })

  describe('for single blog init', async () => {
    beforeEach(async () => {
      await Blog.deleteMany({})
    })

    describe('delete single blog', async () => {
      test('success with status 204 if blog deleted', async () => {
        const savedBlog = await listHelper.initSingleBlog()
        await api
          .delete(`/api/blogs/${savedBlog.id}`)
          .expect(204)
      })

      test('fails if id is not valid', async () => {
        const savedBlog = await listHelper.initSingleBlog()

        await Blog.findByIdAndDelete(savedBlog.id)

        await api
          .delete(`/api/blogs/${savedBlog.id}`)
          .expect(404)
      })
    })

    describe('edit blog', async () => {
      test('success increase likes by 1', async () => {
        const savedBlog = await listHelper.initSingleBlog()
        let { title, author, url, likes } = savedBlog

        await api
          .put(`/api/blogs/${savedBlog.id}`)
          .send({ title, author, url, likes: likes += 1 })
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const editedBlog = await Blog.findById(savedBlog.id)
        assert.strictEqual(editedBlog.likes, savedBlog.likes + 1)
      })

      test('failing if likes is undefined', async () => {
        const savedBlog = await listHelper.initSingleBlog()
        delete savedBlog.likes

        const editedBlog = await api
          .put(`/api/blogs/${savedBlog.id}`)
          .send(savedBlog)
          .expect(400)
          
      })
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})

