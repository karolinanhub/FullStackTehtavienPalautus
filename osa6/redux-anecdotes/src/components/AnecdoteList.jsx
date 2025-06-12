import { useDispatch , useSelector} from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showMessage } from '../reducers/notificationReducer'



const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

const visibleAnecdotes = filter === 'ALL'
  ? anecdotes
  : anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )

  const vote = (anecdote) => {
  dispatch(voteAnecdote({ id: anecdote.id }))
  dispatch(showMessage({ message: `You voted: "${anecdote.content}"`}))
}


  return (
    <div>
       {visibleAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => (vote(anecdote))}>vote</button>
          </div>
        </div>
      )}
    </div>
    ) 
}
export default AnecdoteList