import { useDispatch , useSelector} from 'react-redux'
import { showMessage } from '../reducers/notificationReducer'
import { voteAnecdoteAPI } from '../reducers/anecdoteReducer'



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
  dispatch(voteAnecdoteAPI(anecdote.id))
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