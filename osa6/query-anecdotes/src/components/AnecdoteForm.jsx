import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote } from '../requests'


const AnecdoteForm = () => {

const queryClient = useQueryClient()

const newAnecdotesMutation = useMutation({ 
  mutationFn: createAnecdote, 
  onSuccess: (newAnecdote) => {
    const anecdotes = queryClient.getQueryData(['anecdotes'])
    console.log('cached anecdotes:', anecdotes)
    console.log('new anecdote:', newAnecdote)
    // Invalidate and refetch
    queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
  }
})

const addAnecdote = async (event) => {
  event.preventDefault()
  const content = event.target.anecdote.value
  event.target.anecdote.value = ''
  newAnecdotesMutation.mutate({ content })
  console.log('new anecdote', content)
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
