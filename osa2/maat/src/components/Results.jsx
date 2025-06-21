import Countries from "./Countries"
import Country from "./Country"

const Results = ({ countries, country, setCountry }) => {

    if (country || countries.length === 1)
        return <Country country={country ? country :countries[0]} />
    if (countries.length > 10)
        return <p>Too many matches, specify another filter.</p>
    if (countries.length === 0)
        return <p>No matching countries found.</p>
    
    return <Countries countries={countries} setCountry={setCountry} />
}

export default Results