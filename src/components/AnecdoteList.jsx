import { useSelector } from 'react-redux'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  return (
    sortedAnecdotes.map(anecdote =>
      <Anecdote key={anecdote.id} anecdote={anecdote} />
    )
  )
}

export default AnecdoteList