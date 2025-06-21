import axios from 'axios'
const backendUrl = "https://studies.cs.helsinki.fi/restcountries/"

const getAll = () => {
    const request = axios.get(`${backendUrl}api/all`)
    return request.then(results => results.data)
}

const getCountry = (country) => {
    const request = axios.get(`${backendUrl}api/name/${country}`)
    return request.then(results => results.data)
}

export default { getAll, getCountry }