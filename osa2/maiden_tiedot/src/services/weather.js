import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const api_key = import.meta.env.VITE_OPEN_WEATHER

const get = ({ coordinates }) => {
    const request = axios.get(`${baseUrl}lat=${coordinates[0]}&lon=${coordinates[1]}&units=metric&appid=${api_key}`)
    return request.then(response => response.data)
}

export default { get }
