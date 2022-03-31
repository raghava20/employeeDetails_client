import axios from "axios"

const API_URL = axios.create({
    baseURL: 'https://employee-details--app.herokuapp.com'
})

export default API_URL;