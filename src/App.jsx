import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Header from './components/Header'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  const blogFormRef = useRef()

  const showNotification = ({ message, type }) => {
    setNotificationMessage(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType(null)
    }, 5000)
  }

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)
      window.localStorage.setItem(
        'loggedBlogsUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      showNotification({ message: `User '${user.username}' logged in successfully`, type: 'info' })
    }
    catch (error) {
      showNotification({ message: `${error.response.data.error}`, type: 'error' })
      console.log(error.response.data.error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsUser')
    showNotification({ message: `User '${user.username}' logged out successfully`, type: 'info' })
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))

      showNotification({ message: `a new blog '${createdBlog.title}' added`, type: 'info' })
    }
    catch (error) {
      if (error.response.status === 400) {
        showNotification({ message: 'title and/or url missing', type: 'error' })
      }
      console.log('error', error)
    }
  }

  const editBlog = async (blogObject) => {
    const editedBlog = await blogService.edit(blogObject)
    const user = blogs.filter(blog => blog.id === editedBlog.id)[0].user
    const filteredBlogs = blogs.filter(blog => blog.id !== editedBlog.id)
    const editedBlogs = filteredBlogs.concat({ ...editedBlog, user })
    const sortedBlogs = editedBlogs.sort((a, b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
  }

  const removeBlog = async (blog) => {
    try {
      const id = blog.id
      const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
      if (confirm) {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        showNotification({ message: `Blog ${blog.title} by ${blog.author} removed successfully`, type: 'info' })
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <Header text={'Log in to application'} />
        <Notification message={notificationMessage} type={notificationType} />
        <LoginForm login={handleLogin} />
      </div>
    )
  }
  return (
    <div>
      <Header text={'Blogs'} />
      <Notification message={notificationMessage} type={notificationType} />
      {user.name} logged in <button onClick={handleLogout}>Logout</button><br />
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} username={user.username} editBlog={editBlog} removeBlog={removeBlog} />
      )}
    </div>
  )
}

export default App