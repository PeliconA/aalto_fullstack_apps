import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createPerson = (person) => {
    const request = axios.post(baseUrl, person)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updatePerson = (id, updatedPerson) => {
    const url = `${baseUrl}/${id}`
    const request = axios.put(url, updatedPerson)
    return request.then(response => response.data)
}

export default {
    getAll,
    createPerson,
    deletePerson,
    updatePerson
}