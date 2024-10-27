import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherDisplay from './components/WeatherDisplay';
import CommonCitiesTicker from './components/CommonCitiesTicker';

const App = () => {
  const weatherApiKey = '95ecf574da591b4eb2db6c7fc99165b6';
  const unsplashApiKey = '8pgbjrRMgRmkMcenGVGDFzgv-Uj-TlTk1TsU0S6n3jA';
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleFetchWeather = () => {
    fetchWeather(location);
  };

  const handleFetchWeatherByCoords = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const fetchWeather = (location) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherApiKey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
        fetchCityImage(location);
      })
      .catch(error => console.log("Error fetching weather data:", error));
  };

  const fetchWeatherByCoords = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
        fetchCityImage(data.name);
      })
      .catch(error => console.log("Error fetching weather data:", error));
  };

  const fetchCityImage = (city) => {
    fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashApiKey}`)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const imageUrl = data.results[0].urls.full;
          document.body.style.backgroundImage = `url(${imageUrl})`;
        }
      })
      .catch(error => console.log("Error fetching city image:", error));
  };

  return (
    <div className="outer-container">
      <div className="container">
        <h1>☀️ Weather App ⛅</h1>
        <input 
          type="text" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          placeholder="Enter location"
        />
        <button onClick={handleFetchWeather}>Get Weather</button>
        <button onClick={handleFetchWeatherByCoords}>Use My Location</button>
        {weatherData && <WeatherDisplay weatherData={weatherData} />}
      </div>
      <div id="ticker-container">
        <CommonCitiesTicker weatherApiKey={weatherApiKey} />
      </div>
    </div>
  );
}

export default App;
