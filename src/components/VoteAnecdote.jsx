import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const VoteAnecdote = ({ anecdote, text }) => {
  const dispatch = useDispatch()

  return (
    <button onClick={() => {
      dispatch(voteAnecdote(anecdote))
      dispatch(setNotification(`You voted '${anecdote.content}'`, 10))
      }}>{text}</button>
  )
}

VoteAnecdote.propTypes = {
  anecdote: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired
}

export default VoteAnecdote