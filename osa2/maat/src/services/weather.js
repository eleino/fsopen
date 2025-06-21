import axios from 'axios'
const api_key = import.meta.env.VITE_API_KEY
const url = "https://api.openweathermap.org/data/2.5/weather?"

const getWeather = (lat, lon) => {
    const weatherUrl=`${url}lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
    const request = axios.get(weatherUrl)
    return request.then(results => results.data)
}

export default getWeather