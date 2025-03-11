import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const VoteAnecdote = ({ anecdote, text }) => {
  const dispatch = useDispatch()

  return (
    <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>{text}</button>
  )
}

VoteAnecdote.propTypes = {
  anecdote: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired
}

export default VoteAnecdote