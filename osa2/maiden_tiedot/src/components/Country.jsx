const Country = ({ country }) => {
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
    </div>
  )
}


export default Country