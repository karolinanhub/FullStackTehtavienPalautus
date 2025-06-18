import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
// import { getId } from '../reducers/anecdoteReducer'
import { showMessage } from '../reducers/notificationReducer'
// import anecdotesService  from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    // const newLittleAnecdote = await anecdotesService.createNew(content)
    dispatch(newAnecdote(content))
    dispatch(showMessage({ message: `You created: "${content}"` }, 10))
    //console.log('created new: ', content)
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