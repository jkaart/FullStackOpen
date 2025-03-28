import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
	token = `Bearer ${newToken}`
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const create = async newBlog => {
	const config = {
		headers: { Authorization: token }
	}
	const response = await axios.post(baseUrl, newBlog, config)
	return response.data
}

const edit = async blog => {
	const config = {
		headers: { Authorization: token }
	}
	const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
	return response.data
}

const remove = async id => {
	const config = {
		headers: { Authorization: token }
	}
	const response = await axios.delete(`${baseUrl}/${id}`, config)
	return response.data
}

const comment = async commentObject => {
	const response = await axios.post(`${baseUrl}/${commentObject.id}/comments`, {
		comment: commentObject.comment
	})
	return response.data
}

export default { getAll, create, edit, remove, setToken, comment }
