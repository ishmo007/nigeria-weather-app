import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import settings_icon from '../assets/settings.png'; // ⚙️ icon

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const [forecast, setForecast] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showHumidity, setShowHumidity] = useState(true);
  const [showWind, setShowWind] = useState(true);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

const nigerianStatesAndCapitals = {
  "Abia": "Umuahia",
  "Adamawa": "Yola",
  "Akwa Ibom": "Uyo",
  "Anambra": "Awka",
  "Bauchi": "Bauchi",
  "Bayelsa": "Yenagoa",
  "Benue": "Makurdi",
  "Borno": "Maiduguri",
  "Cross River": "Calabar",
  "Delta": "Asaba",
  "Ebonyi": "Abakaliki",
  "Edo": "Benin City",
  "Ekiti": "Ado-Ekiti",
  "Enugu": "Enugu",
  "Gombe": "Gombe",
  "Imo": "Owerri",
  "Jigawa": "Dutse",
  "Kaduna": "Kaduna",
  "Kano": "Kano",
  "Katsina": "Katsina",
  "Kebbi": "Birnin Kebbi",
  "Kogi": "Lokoja",
  "Kwara": "Ilorin",
  "Lagos": "Lagos",
  "Nasarawa": "Lafia",
  "Niger": "Minna",
  "Ogun": "Abeokuta",
  "Ondo": "Akure",
  "Osun": "Oshogbo",
  "Oyo": "Ibadan",
  "Plateau": "Jos",
  "Rivers": "Port Harcourt",
  "Sokoto": "Sokoto",
  "Taraba": "Jalingo",
  "Yobe": "Damaturu",
  "Zamfara": "Gusau",
  "Abuja": "Abuja"
};

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

const search = async (state) => {
  if (state === "") {
    alert("Select a State");
    return;
  }

  const city = nigerianStatesAndCapitals[state]; // use capital name for API
  if (!city) {
    alert("Invalid State Selection");
    return;
  }

  try {
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},NG&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
    const response = await fetch(currentUrl);
    const data = await response.json();

    if (!response.ok) {
      alert(`${city} not found. Please try another state.`);
      return;
    }

    const icon = allIcons[data.weather[0].icon] || clear_icon;
    setWeatherData({
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      temperature: Math.floor(data.main.temp),
      location: state, // show state instead of capital name
      description: data.weather[0].description,
      icon: icon,
      date: formatDate(new Date())
    });

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},NG&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
    const forecastRes = await fetch(forecastUrl);
    const forecastData = await forecastRes.json();

    const daily = [];
    const seen = new Set();

    for (let item of forecastData.list) {
      const date = item.dt_txt.split(" ")[0];
      if (!seen.has(date)) {
        seen.add(date);
        daily.push({
          date: formatDate(date),
          temp: Math.round(item.main.temp),
          desc: item.weather[0].description,
          icon: allIcons[item.weather[0].icon] || clear_icon
        });
      }
      if (daily.length >= 5) break;
    }

    setForecast(daily);
  } catch (error) {
    setWeatherData(false);
    setForecast([]);
    console.error("Error fetching weather data", error);
  }
};


  useEffect(() => {
    search("Abuja");
  }, []);

  return (
    <div className={`weather ${darkMode ? 'dark' : ''}`}>
      <div className="top-bar">
        <div className="search-section">
          <select ref={inputRef} className="state-dropdown">
           {Object.keys(nigerianStatesAndCapitals).map((state, index) => (
           <option key={index} value={state}>{state}</option>
            ))}
          </select>
          <img src={search_icon} alt="Search" onClick={() => search(inputRef.current.value)} />

        </div>
        <img
          src={settings_icon}
          alt="Settings"
          className="settings-icon"
          onClick={() => setShowSettings(true)}
        />
      </div>

      {weatherData && (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}℃</p>
          <p className="description">{weatherData.description}</p>
          <p className="date">{weatherData.date}</p>
          <p className="location">{weatherData.location}</p>

          <div className="weather-data">
            {showHumidity && (
              <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                  <p>{weatherData.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>
            )}
            {showWind && (
              <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                  <p>{weatherData.windSpeed} km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {forecast.length > 0 && (
        <div className="forecast">
          <h4>5-Day Forecast</h4>
          <div className="forecast-list">
            {forecast.map((day, index) => (
              <div key={index} className="forecast-day">
                <p className="forecast-date">{day.date}</p>
                <img src={day.icon} alt="" className="forecast-icon" />
                <p className="forecast-temp">{day.temp}℃</p>
                <p className="forecast-desc">{day.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {showSettings && (
        <div className="settings-modal-overlay" onClick={() => setShowSettings(false)}>
          <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Settings ⚙️</h3>
            <div className="toggle-item">
              <label>🌗 Dark Mode</label>
              <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            </div>
            <div className="toggle-item">
              <label>💧 Show Humidity</label>
              <input type="checkbox" checked={showHumidity} onChange={() => setShowHumidity(!showHumidity)} />
            </div>
            <div className="toggle-item">
              <label>🌬 Show Wind Speed</label>
              <input type="checkbox" checked={showWind} onChange={() => setShowWind(!showWind)} />
            </div>
            <button className="close-btn" onClick={() => setShowSettings(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
