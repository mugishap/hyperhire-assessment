import Axios from "axios";

const BASE_URL = 'https://hyperhire.onrender.com/api/v1/book'

export const axios = Axios.create({
    baseURL: BASE_URL
})