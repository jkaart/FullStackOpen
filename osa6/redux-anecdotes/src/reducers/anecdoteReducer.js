import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    replaceAnecdote(state, action) {
      const replacedAnecdote = action.payload
      return state.map(anecdote => anecdote.id === replacedAnecdote.id ? replacedAnecdote : anecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { appendAnecdote, setAnecdotes, replaceAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const votedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const returnedAnecdote = await anecdoteService.edit(votedAnecdote)
    dispatch(replaceAnecdote(returnedAnecdote))
  }
}

export default anecdoteSlice.reducer