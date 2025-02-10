import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import Search from './components/Search'
import Countries from './components/Countries'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [find, setFind] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(response => {
        setCountries(response)
      })
  }, [])

  const handleFindChange = (event) => {
    setFind(event.target.value)
    setCountry(null)
  }
  const handleShowInfo = (country) => setCountry(country)

  const filteredCountries = !find
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(find.toLowerCase()))

  const contentToShow = !country
    ? <Countries countries={filteredCountries} handleShowInfo={handleShowInfo} />
    : <Country country={country} />

  return (
    <div>
      <Search value={find} onChange={handleFindChange} />
      {contentToShow}
    </div>
  )
}

export default App
