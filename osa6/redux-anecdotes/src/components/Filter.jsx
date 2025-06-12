import { setFilter } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter
      <input
        name="filter"
        onChange={(event) => dispatch(setFilter(event.target.value))}
      />
    </div>
  )
}

export default Filter