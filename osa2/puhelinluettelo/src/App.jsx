
import { useState, useEffect } from 'react'
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';  
import Persons from './components/Persons';
import personService from './services/persons';


const App = () => {

  const [persons, setPersons] = useState([]);
  // esimerkkkidataa kovakoodatttuna
  //const [persons, setPersons] = useState([
  //  { name: 'Arto Hellas', number: '040-123456' },
  //  { name: 'Ada Lovelace', number: '39-44-5323523' },
  //  { name: 'Dan Abramov', number: '12-43-234345' },
  //  { name: 'Mary Poppendieck', number: '39-23-6423122' }
  // ])
  // lista on tyhjillään
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  // filteri eli rajaus
  const [newfilter, setNewFilter] = useState('');

  const hook = () => {
    console.log('effect')
      personService
        .getAll()
        .then(response => {
          setPersons(response.data)
        });
  };
  
  // oletusarvoisesti efekti suoritetaan aina, kun komponentti renderöidään
  // mutta tyhjällä taulukolla kerrotaan, että efekti suoritetaan vain kerran
  // eli kun komponentti ladataan ensimmäisen kerran
  useEffect(hook, []); 
 // jos lisäämme uusia ihmisiä, ne eivät tallennu vielä  palvelimelle asti


  const addName = (event) => {
        event.preventDefault()
        //console.log('button clicked', event.target)
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
        personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setNewFilter('')
        })
  };


  const handleNameChange = (event) => { 
    setNewName(event.target.value)  
  };

  const handleNumberChange = (event) => { 
    setNewNumber(event.target.value)  
  };

  const handleFilterChange = (event) => { 
    setNewFilter(event.target.value)  
  };

  const handleDelete = (person) => {
   // console.log("handleDelete sai:", person);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          // poistaminen tapahtuu metodilla filter, joka muodostaa uuden taulukon, jonka sisällöksi tulee alkuperäisen taulukon sisällöstä ne alkiot, joille parametrina oleva funktio palauttaa arvon true:
          setPersons(persons.filter(p => p.id !== person.id));
        })
        .catch(error => {
          alert(`The person '${person.name}' was already deleted from the server`);
          // poistetaan henkilö myös paikallisesta tilasta
          setPersons(persons.filter(p => p.id !== person.id)); 
        });
    }
  };

  // jos persons on tyhjillään, niin ei tarvitse filtteröidä
  // varmista, että toimii vaikka olisi tyhjä käyttämällä String-metodia
  // case insensitive
  const filteredPersons = persons.length === 0 ? persons : persons.filter(person => 
    person.name.toLowerCase().includes(String(newfilter).toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter 
          handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
        <PersonForm 
          newName={newName} 
          handleNameChange={handleNameChange} 
          newNumber={newNumber} 
          handleNumberChange={handleNumberChange} 
          addName={addName} />  
      <h2>Numbers</h2>
        <Persons 
          filteredPersons={filteredPersons}
          handleDelete={handleDelete} />
    </div>
  );

};

export default App