import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const VoteAnecdote = ({ anecdote, text }) => {
  const dispatch = useDispatch()

  return (
    <button onClick={() => {
      dispatch(voteAnecdote(anecdote.id))
      dispatch(showNotification(`You voted '${anecdote.content}'`))
      }}>{text}</button>
  )
}

VoteAnecdote.propTypes = {
  anecdote: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired
}

export default VoteAnecdote