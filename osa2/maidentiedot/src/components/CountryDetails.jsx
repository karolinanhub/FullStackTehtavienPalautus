import React from 'react';
import Weather from './Weather';

const CountryDetails = ({ country }) => {
  if (!country) return null;

  return (
    <div>
      <h2>{country.name.common}</h2>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
      <h2>Languages</h2>
        <ul>
            {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
            ))}
        </ul>
        <img src={country.flags.png} alt={`Flag`} style={{ width: '200px', height: 'auto' }} />
        <Weather country={country} />
    </div>
  );
};

export default CountryDetails;