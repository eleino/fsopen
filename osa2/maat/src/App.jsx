import { useEffect, useState } from 'react'
import Results from './components/Results'
import flagService from './services/countries'
import Filter from './components/Filter'

function App() {
  const [countries, setCountries] = useState(null)
  const [userInput, setUserInput] = useState('')
  const [country, setCountry] = useState(null)

  // get list of all countries
  useEffect(() => {
    flagService
      .getAll()
      .then(results =>
        setCountries(results)
      )
  }, [])

  // handle input
  const handleUserInput = (event) => {
    setUserInput(event.target.value)
    setCountry(null)
  }

  // filter countries
  const filteredCountries = countries
    ? countries.filter(c => c.name.common.toLowerCase().includes(userInput.toLowerCase()))
    : [];

  return (
    <>
      <Filter userInput={userInput} handleUserInput={handleUserInput} />
      <Results countries={filteredCountries} country={country} setCountry={setCountry} />
    </>
  )
}

export default App
