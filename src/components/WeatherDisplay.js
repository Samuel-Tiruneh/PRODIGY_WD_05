import React from 'react';

const WeatherDisplay = ({ weatherData }) => {
  return (
    <div className='weather-display'>
      <h2>Weather in {weatherData.name}</h2>
      <p><span className="weather-title">Temperature:</span> {weatherData.main.temp}°C</p>
      <p><span className="weather-title">Conditions:</span> {weatherData.weather[0].description}</p>
      <p><span className="weather-title">Humidity:</span> {weatherData.main.humidity}%</p>
      <p><span className="weather-title">Wind Speed:</span> {weatherData.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherDisplay;
