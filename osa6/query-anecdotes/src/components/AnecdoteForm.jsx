import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote } from '../requests'
import { useNotificationDispatch } from '../hooks/useNotification'


const AnecdoteForm = () => {

const queryClient = useQueryClient()
const dispatch = useNotificationDispatch()

const newAnecdotesMutation = useMutation({ 
  mutationFn: createAnecdote, 
  onSuccess: (newAnecdote) => {
    const anecdotes = queryClient.getQueryData(['anecdotes'])
    console.log('cached anecdotes:', anecdotes)
    console.log('new anecdote:', newAnecdote)
    const anecdoteWithVotes = { ...newAnecdote, votes: 0 }
    // Invalidate and refetch
    queryClient.setQueryData(['anecdotes'], anecdotes.concat(anecdoteWithVotes))
  }
})

const addAnecdote = async (event) => {
  event.preventDefault()
  const content = event.target.anecdote.value
  event.target.anecdote.value = ''
  if (content.length < 5) {
    dispatch({ type: 'SHOW', payload: 'Anecdote must be at least 5 characters long' })
    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, 5000)
    return
  }
  newAnecdotesMutation.mutate({ content })
  console.log('new anecdote', content)
  await dispatch({ type: 'SHOW', payload: `You added: ${content}` })
  setTimeout(() => {
  dispatch({ type: 'HIDE' })
  }, 5000)
}


return (
  <div>
    <h3>create new</h3>
    <form onSubmit={addAnecdote}>
      <input name='anecdote' />
      <button type="submit">create</button>
    </form>
  </div>
)
}

export default AnecdoteForm
