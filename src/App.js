import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">
      <WeatherInfo />
    </div>
  );
}

export default App;

const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_hours&timezone=Asia%2FTokyo';
const WeatherInfo = () => {
  const [weatherInfo, setWeatherInfo] = React.useState();
  const getWeatherInfo = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        setWeatherInfo(data);
        console.log(data);
      });
  }
  React.useEffect(getWeatherInfo, []);
  if (!weatherInfo || !weatherInfo.daily) return <div />;
  return (
    <div>
      <p>{weatherInfo.daily.time[0]}</p>
      <p>最高気温：{weatherInfo.daily.temperature_2m_max[0]} {weatherInfo.daily_units.temperature_2m_max}</p>
      <p>最低気温：{weatherInfo.daily.temperature_2m_min[0]} {weatherInfo.daily_units.temperature_2m_min}</p>
      <p>WeatherCode：{weatherInfo.daily.weathercode[0]}({getWwCode(weatherInfo.daily.weathercode[0])})</p>
      <p>日の出：{new Date(weatherInfo.daily.sunrise[0]).toLocaleTimeString()}</p>
      <p>日の入：{new Date(weatherInfo.daily.sunset[0]).toLocaleTimeString()}</p>
      <p>降雨量{weatherInfo.daily.precipitation_sum[0]} {weatherInfo.daily_units.precipitation_sum}</p>
      <p>降雨時間{weatherInfo.daily.precipitation_hours[0]} {weatherInfo.daily_units.precipitation_hours}</p>
      <button onClick={getWeatherInfo}>refresh</button>
    </div>
  );
};

const getWwCode = (code)  => {
  switch (code) {
    case 0:
      return '快晴';
    case 1:
    case 2:
    case 3:
      return '晴れ';
    case 45:
    case 48:
      return '霧・白霜';
    case 51:
    case 53:
    case 55:
      return '霧雨';
    case 56:
    case 57:
      return '凍った霧雨';
    case 61:
    case 63:
    case 65:
      return '雨';
    case 66:
    case 67:
      return 'みぞれ';
    case 71:
    case 73:
    case 75:
      return '雪';
    case 77:
      return '霧雪';
    case 80:
    case 81:
    case 82:
      return 'にわか雨';
    case 85:
    case 86:
      return 'にわか雪';
    case 95:
      return '雷雨';
    case 96:
    case 99:
      return '雹を伴う雷雨';
    default:
      return '-';
  }
};