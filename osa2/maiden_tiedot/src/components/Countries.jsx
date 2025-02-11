import Country from "./Country"

const Countries = ({ countries, handleShowInfo }) => {
  if (countries.length > 10) return <p>Too many matches, specify another filter</p>
  if (countries.length === 1) return <Country country={countries[0]}/>
  return (
    <ul>
      {countries.map((country, index) => (
        <li key={index}>
          {country.name.common}
          <button onClick={() => handleShowInfo({ country })}>show</button>
        </li>
      ))}
    </ul>
  )
}

export default Countries