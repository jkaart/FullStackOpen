import PropTypes from 'prop-types'

const Notification = ({ type, message }) => {
	if (message === null) {
		return null
	}
	return <div className={['notification', type].join(' ')}>{message}</div>
}

Notification.propTypes = {
	type: PropTypes.oneOf(['error', 'info']),
	message: PropTypes.string,
}

export default Notification
