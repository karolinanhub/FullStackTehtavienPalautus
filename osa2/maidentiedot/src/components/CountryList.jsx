import React from 'react';

export const CountryList = ({ countries, onShow }) => {
  if (countries.length === 0) {
    return null;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {countries.map(c => (
        <li key={c.name.common} style={{ marginBottom: '0.5em' }}>
          {c.name.common}{' '}
          <button onClick={() => onShow(c.name.common)}>
            Show
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;