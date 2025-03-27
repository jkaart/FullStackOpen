import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const RemoveBlogBtn = ({ blogUser, onClick }) => {
	const loggedUser = useSelector(state => state.user.username)
	if (loggedUser === blogUser) {
		return (
			<Button
				sx={{ marginRight: 1, marginTop: 1 }}
				variant='contained'
				startIcon={<DeleteIcon />}
				onClick={onClick}
			>
				remove
			</Button>
		)
	}
}

RemoveBlogBtn.propTypes = {
	blogUser: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
}

export default RemoveBlogBtn
