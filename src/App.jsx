import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => setUsername(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)

  const login = (event) => {
    event.preventDefault()
    console.log('Login event')
    loginService
      .login({ username, password })
      .then(response => {
        setUser(response)
        setUsername('')
        setPassword('')
      })
      .catch(error => {
        console.log(error.response.data.error)
      })
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={login}>
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
      {user.name} logged in <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App