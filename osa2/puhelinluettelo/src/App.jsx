import { useState } from 'react'

const App = () => {
  // lista on tyhjillään
  const [persons, setPersons] = useState([]) 
  // lista on tyhjillään
  const [newName, setNewName] = useState([''])

  const [newNumber, setNewNumber] = useState([''])

  const addName = (event) => {
        event.preventDefault()
        console.log('button clicked', event.target)
        // some-metodi käy läpi taulukon ja palauttaa true, jos jokin ehto täyttyy. toimii erityisesti taulukon kanssa, jossa on olioita
        //esim includes metodi toimii vain perusdatatyypeillä, kuten string
        if (persons.some(person => person.content === newName)) {
          alert(`${newName} is already added to phonebook`)
          setNewName('')
          setNewNumber('')
          return
        }
        const personObject = {
          content: newName,
          number: newNumber,
          //important: Math.random() > 0.5,
          id: String(persons.length + 1),
        }
        //metodi concat yhdistää kaksi taulukkoa uudeksi taulukoksi
        setPersons(persons.concat(personObject))
        //tyhjennetään input-kenttä
        setNewName('')
        setNewNumber('')
  }


  const handleNameChange = (event) => { 
    console.log(event.target.value)
    setNewName(event.target.value)  
  }

  const handleNumberChange = (event) => { 
    console.log(event.target.value)
    setNewNumber(event.target.value)  
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <form onSubmit={addName}>
          <div>name: 
            <input value ={newName}
            onChange={handleNameChange}/>
          </div>
          <div>number: 
            <input value ={newNumber}
            onChange={handleNumberChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>

        </form>
      <h2>Numbers</h2>
      <ul style={{ listStyleType: 'none' }}>
        {persons.map(person => (
          <li key={person.content}>{person.content + " "}{person.number}</li>
        ))}
      </ul>
    </div>
  )

}

export default App