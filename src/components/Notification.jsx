import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
	const notification = useSelector(({ notification }) => {
		return notification
	})

	if (notification.message === '') {
		return null
	}
	return <div className={['notification', notification.type].join(' ')}>{notification.message}</div>
}

/* Notification.propTypes = {
	type: PropTypes.oneOf(['error', 'info']),
	message: PropTypes.string,
} */

export default Notification
