import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { getId } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const anecdoteObject = {
      content,
      id: getId(),
      votes: 0
    }

    dispatch(newAnecdote(anecdoteObject))
    console.log('created new: ', content)
  }

  return (
    <form onSubmit={create}>
      <h2>create new</h2>
      <div>
          <input name="anecdote"/>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm