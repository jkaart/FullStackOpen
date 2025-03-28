import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => {
    return notification
  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification.visible) {
    return (
      <div style={style}>
        {notification.message}
      </div>
    )
  }
}

export default Notification