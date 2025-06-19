import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm  from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'

const App = () => {

  const queryClient = useQueryClient()

  // kysely useQuery, asynkroninen data on sidottu avaimella
  const result = useQuery({    
    queryKey: ['anecdotes'],    
    queryFn: getAnecdotes, 
    retry: false
  })

  //console.log(JSON.parse(JSON.stringify(result)))

  const anecdotes = result.data

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a))
    }
  })  

 const handleVote = (anecdote) => {
    console.log('vote for: ', anecdote.content)
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  if ( result.isLoading ) { 
    return <div>loading data...</div>  
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  /*const anecdotes = [
    {
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
  ] */

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
