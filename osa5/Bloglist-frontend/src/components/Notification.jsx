import { useSelector } from 'react-redux'

const Notification = () => {
	const notification = useSelector(({ notification }) => {
		return notification
	})

	if (notification.message === '') {
		return null
	}
	return (
		<div className={['notification', notification.type].join(' ')}>
			{notification.message}
		</div>
	)
}

export default Notification
