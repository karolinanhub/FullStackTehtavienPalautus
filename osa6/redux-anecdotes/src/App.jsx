import { useSelector, useDispatch } from 'react-redux'
import { createAnectode, } from './reducers/anecdoteReducer'
import { vote} from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const handleVote = (id) => {
    dispatch(vote(id))
    console.log('voted', id)
  }

  const create = (event) => {
    event.preventDefault()
    const content = event.target.anectode.value
    event.target.anectode.value = ''
    dispatch(createAnectode(content))
    console.log('created new: ', content)
  }


  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="anectode" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App