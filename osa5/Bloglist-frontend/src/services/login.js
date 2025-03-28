import axios from 'axios'
const baseUrl = '/api/login'

const login = async ({ username, password }) => {
	const request = axios.post(baseUrl, { username, password })
	const response = await request
	return response.data
}

export default { login }
