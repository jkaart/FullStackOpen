import PropTypes from 'prop-types'

const RemoveBlogBtn = ({ loggedUser, blogUser, onClick }) => {
  if (loggedUser === blogUser) {
    return (<button onClick={onClick}>remove</button>)
  }
}

RemoveBlogBtn.propTypes = {
  loggedUser: PropTypes.string.isRequired,
  blogUser: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default RemoveBlogBtn