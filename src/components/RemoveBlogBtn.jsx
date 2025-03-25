import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const RemoveBlogBtn = ({ blogUser, onClick }) => {
	const loggedUser = useSelector(state => state.user.username)
	if (loggedUser === blogUser) {
		return <button onClick={onClick}>remove</button>
	}
}

RemoveBlogBtn.propTypes = {
	// loggedUser: PropTypes.string.isRequired,
	blogUser: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
}

export default RemoveBlogBtn
