const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }
]

const initialUsers = () => {
  return [
    {
      username: 'test',
      name: 'testi testaaja',
      password: 'salasana'
    },
    {
      username: 'seppo',
      name: 'Seppo Testaaja',
      password: 'ssana'
    },
    {
      username: 'aankka',
      name: 'Aku Ankka',
      password: 'salaankka'
    }
  ]
}

const singleBlog = {
  title: 'Test blog',
  author: 'Blog Tester',
  url: 'http://blog.test.com',
  likes: 2,
}

const singleUser = initialUsers()[0]

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, blog) => accumulator + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const favBlog = blogs.reduce((most, blog) => most.likes > blog.likes ? most : blog)
  return { title: favBlog.title, author: favBlog.author, likes: favBlog.likes }
}

const mostBlogs = (blogs) => {
  const sums = _.countBy(blogs, 'author')
  const author = _.maxBy(Object.keys(sums), author => sums[author])

  return { author, blogs: sums[author] }
}

const mostLikes = (blogs) => {
  const likesSum = blogs.reduce((accumulator, blog) => {
    if (!accumulator[blog.author]) {
      accumulator[blog.author] = 0
    }
    accumulator[blog.author] += blog.likes
    return accumulator

  }, {})
  const author = _.maxBy(Object.keys(likesSum), author => likesSum[author])
  return { author, likes: likesSum[author] }
}

const initUser = async () => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash('tokentest', saltRounds)
  const user = new User({
    username: 'tokenTest',
    name: 'Test User',
    passwordHash
  })
  const savedUser = await user.save()

  return {
    id: savedUser.id,
    name: savedUser.name,
    username: savedUser.username,
  }
}

const initSingleBlog = async (user) => {
  const newBlog = { ...singleBlog }
  const blog = new Blog(newBlog)
  blog.user = user.id
  const savedBlog = await blog.save()

  return {
    id: savedBlog.id,
    title: savedBlog.title,
    author: savedBlog.author,
    url: savedBlog.url,
    likes: savedBlog.likes,
    user: savedBlog.user
  }
}

const userLogin = async (userid) => {
  const user = await User.findById(userid)
  if (!user) {
    return null
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  return token
}

const initUserLogin = async () => {
  const user = await initUser()
  const token = await userLogin(user.id)

  return { user, token }
}

const initUserBlogLogin = async () => {
  const user = await initUser()
  const savedBlog = await initSingleBlog(user)
  const token = await userLogin(user.id)

  return { user, blog: savedBlog, token }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  initialBlogs,
  singleBlog,
  initSingleBlog,
  initialUsers,
  singleUser,
  initUser,
  userLogin,
  initUserLogin,
  initUserBlogLogin,
}