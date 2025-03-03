import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  const showNotification = ({ message, type }) => {
    setNotificationMessage(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType(null)
    }, 5000)
  }

  const handleUsernameChange = (event) => setUsername(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)

  const handleNewTitle = (event) => setNewTitle(event.target.value)
  const handleNewAuthor = (event) => setNewAuthor(event.target.value)
  const handleNewUrl = (event) => setNewUrl(event.target.value)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Login event')
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogsUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      showNotification({ message: `User '${user.username}' logged in successfully`, type: 'info' })
      setUsername('')
      setPassword('')
    }
    catch (error) {
      showNotification({ message: `${error.response.data.error}`, type: 'error' })
      console.log(error.response.data.error)
    }
  }

  const handleLogout = () => {
    console.log('Logout event')
    window.localStorage.removeItem('loggedBlogsUser')
    showNotification({ message: `User '${user.username}' logged out successfully`, type: 'info' })
    setUser(null)
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      }
      const createdBlog = await blogService.create(blog)
      const updatedBlogs = [...blogs, createdBlog]
      setBlogs(updatedBlogs)

      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      
      showNotification({ message: `a new blog '${createdBlog.title}' added`, type: 'info' })
    }
    catch (error) {
      showNotification({ message: error.response.data.error, type: 'error' })
    }
  }

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
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
        <h2>Log in to application</h2>
        <Notification message={notificationMessage} type={notificationType} />
        <form onSubmit={handleLogin}>
          username <input value={username} onChange={handleUsernameChange} /><br />
          password <input value={password} onChange={handlePasswordChange} type='password' /><br />
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} type={notificationType} />
      {user.name} logged in <button onClick={handleLogout}>Logout</button><br />
      <div>
        <h2>create new</h2>
        <BlogForm
          onSubmit={handleNewBlog}
          titleValue={newTitle}
          titleOnChange={handleNewTitle}
          authorValue={newAuthor}
          authorOnChange={handleNewAuthor}
          urlValue={newUrl}
          urlOnChange={handleNewUrl}
        />
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App