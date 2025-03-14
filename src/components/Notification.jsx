import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(({ notification }) => {
    return notification
  })

  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(hideNotification())
    }, notification.timeout)
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