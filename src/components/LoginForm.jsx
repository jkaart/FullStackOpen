import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => setUsername(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)

  const handleLogin = (event) => {
    event.preventDefault()
    login({
      username,
      password
    })

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      username <input value={username} onChange={handleUsernameChange} /><br />
      password <input value={password} onChange={handlePasswordChange} type='password' /><br />
      <button type="submit">Login</button>
    </form>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
}

export default LoginForm