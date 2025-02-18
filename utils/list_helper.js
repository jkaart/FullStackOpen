const _ = require('lodash')

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
  mostLikes
}