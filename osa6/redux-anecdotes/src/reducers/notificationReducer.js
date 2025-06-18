import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    setMessage(state, action) {
      return { message: action.payload.message }
    },
    clearMessage() {
      return { message: '' }
    }
  }
}) 

export const showMessage = (message, duration = 5) => {
  return dispatch => {
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(clearMessage())
    }, duration * 1000)
  }
}

export const { setMessage, clearMessage } = notificationSlice.actions
export default notificationSlice.reducer