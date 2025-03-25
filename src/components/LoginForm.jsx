import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logIn } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
	const dispatch = useDispatch()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleUsernameChange = event => setUsername(event.target.value)
	const handlePasswordChange = event => setPassword(event.target.value)

	const handleLogin = event => {
		try {
			event.preventDefault()
			dispatch(logIn({ username, password }))
		} catch (error) {
			console.log(error)
			dispatch(setNotification(`${error.response.data.error}`, 'error'))
		}

		setUsername('')
		setPassword('')
	}

	return (
		<form onSubmit={handleLogin}>
			username
			<input
				value={username}
				data-testid='username'
				onChange={handleUsernameChange}
			/>
			<br />
			password
			<input
				value={password}
				data-testid='password'
				onChange={handlePasswordChange}
				type='password'
			/>
			<br />
			<button type='submit'>Login</button>
		</form>
	)
}

export default LoginForm
