const { default: axios } = require("axios");

const apikey=process.env.RESET_API_KEY;
const apiurl="https://strapi-project-0e4u.onrender.com"

const axiosApi=axios.create({
    baseURL:apiurl,
    headers:{
        Authorization:`Bearer${apikey}`
    }
})
export default axiosApi