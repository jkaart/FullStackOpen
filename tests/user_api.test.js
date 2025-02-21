const bcrypt = require('bcrypt')
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const listHelper = require('../utils/list_helper')

const api = supertest(app)

describe('user api tests', async () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('success user creation', async () => {
    const user = { ...listHelper.singleUser }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const createdUser = await User.findById(response.body.id)
    delete user.password
    user.id = response.body.id
    assert.deepStrictEqual(user, { id: createdUser.id, username: createdUser.username, name: createdUser.name })
  })

  test('list all users', async () => {
    const initialUsers = listHelper.initialUsers()
    console.log('initial', initialUsers)
    for (const user of initialUsers) {
      console.log('user', user)
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(user.password, saltRounds)

      const userToDb = new User({
        username: user.username,
        name: user.name,
        passwordHash
      })

      await userToDb.save()
    }

    const usersInDb = await User.find({})
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(usersInDb.length, response.body.length)
  })

  test('fails if username is undefined', async () => {
    const user = { ...listHelper.singleUser }
    delete user.username
    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual({ error: 'username missing' }, response.body)
  })

  test('fails if password is undefined', async () => {
    const user = { ...listHelper.singleUser }
    delete user.password
    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual({ error: 'password missing' }, response.body)
  })

  test('fails if password length is under 3 characters', async () => {
    const user = { ...listHelper.singleUser }
    user.password = 'ss'
    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual({ error: 'password is too short' }, response.body)
  })

  test('fail if username not unique', async () => {
    const initialUser = { ...listHelper.singleUser }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(initialUser.password, saltRounds)

    const user = new User({
      username: initialUser.username,
      name: initialUser.name,
      passwordHash
    })

    await user.save()

    const response = await api
      .post('/api/users')
      .send(initialUser)
      .expect(400)

    assert.deepStrictEqual({ error: 'expected `username` to be unique' }, response.body)
  })
})

after(async () => {
  await mongoose.connection.close()
})