import React, { useState, useEffect } from 'react';

const CommonCitiesTicker = ({ weatherApiKey }) => {
  const [citiesWeather, setCitiesWeather] = useState('');

  useEffect(() => {
    const commonCities = ['New York', 'Tokyo', 'London', 'Paris', 'Sydney'];

    const fetchCommonCitiesWeather = () => {
      commonCities.forEach(city => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`)
          .then(response => response.json())
          .then(data => {
            if (data.cod === 200) {
              setCitiesWeather(prev => `${prev} ${data.name}: ${data.main.temp}°C, ${data.weather[0].description} | `);
            }
          })
          .catch(error => console.log("Error fetching common cities weather:", error));
      });
    };

    fetchCommonCitiesWeather();
  }, [weatherApiKey]);

  return (
    <div id="commonCitiesWeather" className="ticker">
      {citiesWeather}
    </div>
  );
};

export default CommonCitiesTicker;
