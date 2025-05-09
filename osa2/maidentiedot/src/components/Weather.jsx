import React from "react";
import axios from "axios";
import {useState} from "react";
import {useEffect} from "react";
import Notification from "./Notification";



const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const api_key = import.meta.env.VITE_AVAIN
    const lat = country.latlng[0];
    const lon = country.latlng[1];
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;

    axios
      .get(url)
      .then((response) => {
        setWeather(response.data);
        setError(null);
      })
      .catch((error) => {
        setError("Weather data not available");
        setWeather(null);
      });
  }, [country]);


  return (
    <div>
        <h2>Weather in {country.name.common}</h2>
        {error && <Notification message={error} />}
        {weather ? 
        <div>
            <p>Temperature {weather.main.temp} Celsius</p>
            <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="Weather icon"
            />
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
        : null
        }
    </div>
  );
}

export default Weather