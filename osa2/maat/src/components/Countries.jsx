
const Countries = ({ countries, setCountry }) => {
  return (
    <ul className="countries">
      {countries.map((country) => (
        <li key={country.name.common}>
          {country.name.common}
          <button onClick={() => setCountry(country)}>Show</button>
        </li>
      ))}
    </ul>
  )


}

export default Countries