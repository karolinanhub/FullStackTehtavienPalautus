import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
//i mport anecdotesService from './services/anecdotes'
// import {setAnecdotes} from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { initializeAnectodes } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()  
  useEffect(() => {
    dispatch(initializeAnectodes())
  }, []) 
  
    return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App