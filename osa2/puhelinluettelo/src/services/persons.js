import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const deletePerson = (id, newObject) => {
    return axios.delete(`${baseUrl}/${id}`, newObject)
}

export default { getAll, create, update, deletePerson};

// Moduuli palauttaa nyt olion, jonka kenttinä (getAll, create ja update) on kolme persoonien käsittelyä hoitavaa funktiota.