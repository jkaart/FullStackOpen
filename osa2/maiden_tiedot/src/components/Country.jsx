import { useState, useEffect } from 'react'
import weatherService from '../services/weather'
import Weather from './weather'

const Country = ({ country }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    weatherService
      .get({ coordinates: country.capitalInfo.latlng })
      .then(response => {
        return { name: response.name, temperature: response.main.temp, wind: response.wind.speed, icon: response.weather[0].icon }
      })
      .then(weather => {
        setWeather(weather)
      })
  }, [country.capitalInfo.latlng])

  return (
    <div>
      <h3>{country.name.common}</h3>
      capital {country.capital[0]}<br />
      area {country.area}
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((lang, index) => (<li key={index}>{lang}</li>))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <Weather name={weather.name} temperature={weather.temperature} wind={weather.wind} icon={weather.icon} />
    </div>
  )
}


export default Country