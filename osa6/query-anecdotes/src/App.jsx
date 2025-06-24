import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm  from './components/AnecdoteForm'
import Notification from './components/Notification'
import VoteButton from './components/voteButton'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'


const App = () => {


  // kysely useQuery, asynkroninen data on sidottu avaimella
  const result = useQuery({    
    queryKey: ['anecdotes'],    
    queryFn: getAnecdotes, 
    retry: false
  })

  //console.log(JSON.parse(JSON.stringify(result)))

  const anecdotes = result.data


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
             <VoteButton anecdote={anecdote} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
