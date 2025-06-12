import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import anecdotesReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)