import { useState } from 'react'

const App = () => {
  // esimerkkkidataa kovakoodatttuna
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  // lista on tyhjillään
  const [newName, setNewName] = useState([''])
  const [newNumber, setNewNumber] = useState([''])
  // filteri eli rajaus
  const [newfilter, setNewFilter] = useState('')


  const addName = (event) => {
        event.preventDefault()
        console.log('button clicked', event.target)
        // some-metodi käy läpi taulukon ja palauttaa true, jos jokin ehto täyttyy. toimii erityisesti taulukon kanssa, jossa on olioita
        //esim includes metodi toimii vain perusdatatyypeillä, kuten string
        if (persons.some(person => person.name === newName)) {
          alert(`${newName} is already added to phonebook`)
          setNewName('')
          setNewNumber('')
          setNewFilter('')
          return
        }
        const personObject = {
          name: newName,
          number: newNumber,
          //important: Math.random() > 0.5,
          id: String(persons.length + 1),
        }
        //metodi concat yhdistää kaksi taulukkoa uudeksi taulukoksi
        setPersons(persons.concat(personObject))
        //tyhjennetään input-kenttä
        setNewName('')
        setNewNumber('')
        setNewFilter('')
  }


  const handleNameChange = (event) => { 
    setNewName(event.target.value)  
  }

  const handleNumberChange = (event) => { 
    setNewNumber(event.target.value)  
  }

  const handleFilterChange = (event) => { 
    setNewFilter(event.target.value)  
  }

  // varmista, että toimii vaikka olisi tyhjä käyttämällä String-metodia
  // case insensitive
  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(String(newfilter).toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with:
        <input value = {newfilter}
        onChange={handleFilterChange}></input>

      </div> 
      <h2>add a new</h2>
        <form onSubmit={addName}>
          <div>name: 
            <input value = {newName}
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
        {filteredPersons.map(person => (
          <li key={person.name}>{person.name + " "}{person.number}</li>
        ))}
      </ul>
    </div>
  )

}

export default App