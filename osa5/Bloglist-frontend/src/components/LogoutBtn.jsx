import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button } from '@mui/material'

const LogoutBtn = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	const handleLogout = () => {
		dispatch(logOut())
		dispatch(
			setNotification(`User '${user.username}' logged out successfully`, 'info')
		)
	}

	return (
		<Button
			variant='contained'
			size='small'
			color='secondary'
			onClick={handleLogout}
		>
			Logout
		</Button>
	)
}

export default LogoutBtn
