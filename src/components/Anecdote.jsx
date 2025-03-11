import PropTypes from 'prop-types'
import VoteAnecdote from './VoteAnecdote'

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <VoteAnecdote text='vote' anecdote={anecdote} />
      </div>
    </div>
  )
}

Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired
}

export default Anecdote