import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Paper, TextField, Grid } from '@mui/material'
import { logIn } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import Heading from './Heading'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
	const navigate = useNavigate()
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
		navigate('/')
	}

	return (
		<Grid
			container
			rowSpacing={10}
			columnGap={10}
			rowGap={5}
			direction={'column'}
			justify={'center'}
			alignItems={'center'}
			padding={10}
		>
			<Grid>
				<Heading text='Log in to application' />
			</Grid>
			<form onSubmit={handleLogin}>
				<Grid padding={1}>
					<TextField
						label='username'
						value={username}
						data-testid='username'
						onChange={handleUsernameChange}
					/>
				</Grid>
				<Grid padding={1}>
					<TextField
						label='password'
						value={password}
						data-testid='password'
						onChange={handlePasswordChange}
						type='password'
					/>
				</Grid>
				<Grid padding={1}>
					<Button variant='contained' type='submit'>
						Login
					</Button>
				</Grid>
			</form>
		</Grid>
	)
}

export default LoginForm
