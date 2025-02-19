const _ = require('lodash')

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }
]

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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  initialBlogs
}