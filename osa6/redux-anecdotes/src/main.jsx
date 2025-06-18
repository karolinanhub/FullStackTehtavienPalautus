import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import anecdotesReducer, {setAnecdotes} from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdotesService from './services/anecdotes'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'


const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

anecdotesService.getAll().then(anecdotes =>  
  store.dispatch(setAnecdotes(anecdotes))
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)