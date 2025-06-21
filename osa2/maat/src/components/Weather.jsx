import { useState, useEffect } from 'react'
import getWeather from "../services/weather"

const Weather = ({ country }) => {
    const [weather, setWeather] = useState(null)
    const lat = country.capitalInfo.latlng[0]
    const lng = country.capitalInfo.latlng[1]
    const capital = country.capital
    const iconUrl = "https://openweathermap.org/img/wn/"
    useEffect(() => {
        getWeather(lat, lng)
            .then(results => {
                setWeather(results)
                console.log(results)
            })
    }, [])

    if (!weather) return null
    return (
        <>
            <h2>Weather in {capital}</h2>
            <p>Temperature {weather.main.temp} Celsius</p>
            <img src={`${iconUrl}${weather.weather[0].icon}@2x.png`} />
            <p>Wind {weather.wind.speed} m/s</p>
        </>
    )
}
export default Weather