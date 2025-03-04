const RemoveBlogBtn = ({ loggedUser, blogUser, onClick }) => {
  if (loggedUser === blogUser) {
    return (<button onClick={onClick}>remove</button>)
  }
}

export default RemoveBlogBtn