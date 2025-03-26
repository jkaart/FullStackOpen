import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const LogoutBtn = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	const handleLogout = () => {
		dispatch(logOut())
		dispatch(
			setNotification(`User '${user.username}' logged out successfully`, 'info')
		)
	}

	return <button onClick={handleLogout}>Logout</button>
}

export default LogoutBtn
