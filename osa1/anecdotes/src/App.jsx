import { useState } from 'react'

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))

  const handleNextAnecdote = () => { 
    setSelected(getRandomInt(anecdotes.length)); 
  }

  const handleVote = () => { 
    const copy = [...points];
    copy[selected] += 1; 
    setPoints(copy);
  }

  function getWinner (){
    let maxIndex = 0; 
    let maxVotes = 0;
    for (let i = 0; i < points.length; i ++){
      if (points[i] > maxVotes){
        maxVotes = points[i];
        maxIndex = i;  
      }
    } return maxIndex; 
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>
      <h1>Anectode with most votes</h1>
      <p>{anecdotes[getWinner()]}</p>
      <p>has {points[getWinner()]} votes</p>
    </div>
  )
}

export default App