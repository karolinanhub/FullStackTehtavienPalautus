import {useContext} from 'react'
import NotificationContext from '../components/NotificationContext'
  

// Lukee kontekstista ilmoituksen arvon
  export const useNotificationValue = () => {
    const noteAndDispatch = useContext(NotificationContext)
    return noteAndDispatch[0]
}

// Palauttaa dispatch-funktion
 export const useNotificationDispatch = () => {
    const noteAndDispatch = useContext(NotificationContext)
    return noteAndDispatch[1]
}

export default useNotificationValue