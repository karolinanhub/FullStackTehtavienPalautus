import { useState } from 'react'

const App = () => {
  // lista on tyhjillään
  const [persons, setPersons] = useState([]) 
  // lista on tyhjillään
  const [newName, setNewName] = useState([''])

  const addName = (event) => {
        event.preventDefault()
        console.log('button clicked', event.target)
        // some-metodi käy läpi taulukon ja palauttaa true, jos jokin ehto täyttyy. toimii erityisesti taulukon kanssa, jossa on olioita
        //esim includes metodi toimii vain perusdatatyypeillä, kuten string
        if (persons.some(person => person.content === newName)) {
          alert(`${newName} is already added to phonebook`)
          setNewName('')
          return
        }
        const personObject = {
          content: newName,
          //important: Math.random() > 0.5,
          id: String(persons.length + 1),
        }
        //metodi concat yhdistää kaksi taulukkoa uudeksi taulukoksi
        setPersons(persons.concat(personObject))
        //tyhjennetään input-kenttä
        setNewName('')
  }


  const handleNameChange = (event) => { 
    console.log(event.target.value)
    setNewName(event.target.value)  
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <form onSubmit={addName}>
          name: 
          <input value ={newName}
          onChange={handleNameChange}/>
          <p></p>
          <button type="submit">add</button>
        </form>
      <h2>Numbers</h2>
      <ul style={{ listStyleType: 'none' }}>
        {persons.map(person => (
          <li key={person.content}>{person.content}</li>
        ))}
      </ul>
    </div>
  )

}

export default App