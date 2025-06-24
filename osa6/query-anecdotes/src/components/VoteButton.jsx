import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests'
import { useNotificationDispatch } from '../hooks/useNotification'
import PropTypes from 'prop-types'

const VoteButton= ({ anecdote }) => {   

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const voteMutation =  useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a))
    }
  })  

 const handleVote = () => {
    console.log('vote for: ', anecdote.content)
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({ type: 'SHOW', payload: `You voted for: ${anecdote.content}` })
    setTimeout(() => {
    dispatch({ type: 'HIDE' })
    }, 5000)
  }

  return <button onClick={handleVote}>vote</button>

}

export default VoteButton


VoteButton.propTypes = {
  anecdote: PropTypes.shape({
    content: PropTypes.string,
    id: PropTypes.string,
    votes: PropTypes.number,
  })
}