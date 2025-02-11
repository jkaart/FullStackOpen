const Weather = ({ name, temperature, wind, icon }) => {
  const url = icon === undefined
  ? null
  : `https://openweathermap.org/img/wn/${icon}@2x.png`

  return (
    <div>
      <h3>Weather in {name}</h3>
      temperature {temperature} Celsius<br />
      <img src={url} /><br />
      wind {wind} m/s
    </div>
  )
}

export default Weather
