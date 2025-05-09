import { useState } from 'react'
import './App.css'
import Filter from './components/Filter';
import Notification from './components/Notification'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'
import { useEffect } from 'react'
import countryService from './services/countries'


function App() {
  // virheilmoitus
  const [errorMessage, setErrorMessage] = useState(null);
  //kaikkein maiden lista
  const [countries, setCountries] = useState([]);
  //suodatettu maiden lista
  const [filtered, setFiltered] = useState([]);
  // valittu maa
  const [selectedCountry, setSelectedCountry] = useState(null);

  // haetaan kaikki maat palvelimelta
  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response.data);
        console.log('Haetut maat:', response.data)
      });
  }, []);

  //asetetaan valittu maa omaan tilaan
  const showCountryDetails = (name) => {
    countryService.getOneCountry(name)
      .then(response => setSelectedCountry(response.data))
  };

  //suodatetaan maat hakuehdon mukaan
  const handleFilterChange = (event) => { 
    const value = event.target.value;
    //suodatetaan ja laitetaan suodatetut maat omaan tilaan
    const matches = countries.filter(c =>
      c.name.common.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(matches); 
    //jos ehdon täyttäviä maita on liikaa (yli kymmenen), kehotetaan tarkentamaan hakuehtoa
    if ( matches.length > 10) {
      setErrorMessage('Too many matches, specify another filter')
      setSelectedCountry(null);
      setFiltered([]);
    }
    else {
      //poistetaan virheilmoitus
      setErrorMessage(null);
      // jos hakuehdon täyttäviä maita on vain yksi, näytetään sen tiedot
      if (matches.length === 1) {
        showCountryDetails(matches[0].name.common);
      } else {
        //jos hakuehdon täyttäviä on enemmän kuin yksi, asetetaan valituksi maa nulliksi
        setSelectedCountry(null);
      }
    }    
    // jos hakukenttä tyhjennetään, poistetaan virheilmoitukset ja valittu maa
    if (value === '') {
      setFiltered([]);
      setErrorMessage(null);
      setSelectedCountry(null);
    }
  };

  return (
    <div className="App">
      <Filter handleFilterChange={handleFilterChange}/>
      <Notification message={errorMessage} />
      {selectedCountry
        ? <CountryDetails country={selectedCountry} />
        : <CountryList countries={filtered} onShow={showCountryDetails} />
      }
    </div>
  )
}

export default App
