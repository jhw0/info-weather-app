import React, { useState, useEffect } from 'react'
import axios from 'axios';

function App() {

  const[data, setData] = useState({})
  const[location, setLocation] = useState('')
  const [showPlaceholder, setShowPlaceholder] = useState(true)
  

  const fetchWeatherData = (city) => 
  {
    const encodedInput = encodeURIComponent(city);
    const apiKey = "1a0c63e60ab9dffd828c00e492dd96c6";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedInput}&appid=${apiKey}&units=metric`;

    axios.get(url).then
    (
      (response) => 
        {
          console.log(response.data);
          setData(response.data);
        }
    ).catch((error) => {console.log(error)});
  }
    
  useEffect(() => {
    fetchWeatherData('Vancouver');
  }, []);

  const searchLocation = (event) => {
    if (event.key === 'Enter') 
    {
      fetchWeatherData(location);
      setLocation('');
      setShowPlaceholder(true);
    }
  }
 

  return (
    <div className='app'>
      <div className="search">
        <input 
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          onFocus={() => setShowPlaceholder(false)}
          onBlur={() => setShowPlaceholder(true)}
          placeholder={showPlaceholder ? 'Search for a location' : ''}
          type="text" 
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name} {data.sys && `, ${data.sys.country}`}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
            <p>Feels like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className='bold'>{data.main.humidity} %</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} KM/H</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
   
  );
}

export default App;
