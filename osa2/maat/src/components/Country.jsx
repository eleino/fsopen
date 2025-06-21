import Weather from './Weather'
const Country = ({country}) => {
    return (
        <>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area}</p>
        <h2>Languages</h2>
        <ul>
        {Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
        ))}
        </ul>
        <img src={country.flags.png} />
        <Weather country={country} />
        </>
    )

}

export default Country