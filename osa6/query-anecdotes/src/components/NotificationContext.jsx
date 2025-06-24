import { useReducer, createContext} from 'react'
import PropTypes from 'prop-types'
  
const notificationReducer  = (state, action) => {
switch (action.type) { 
    case 'SHOW':
        return action.payload
    case 'HIDE':
        return ''
    default:
        return state
}
} 

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
const [notification, notificationDispatch] = useReducer(notificationReducer , '')

return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
        {props.children}
    </NotificationContext.Provider>
)
}

// prop-tyypitys jotta children tunnistetaan
// mikä tahansa, children on Reactin renderöitävää sisältöä (node)
NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default NotificationContext