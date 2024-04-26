const { default: axios } = require("axios");

const apikey=process.env.RESET_API_KEY;
const apiurl="https://scout-backend-sl42.onrender.com"

const axiosApi=axios.create({
    baseURL:apiurl,
    headers:{
        Authorization:`Bearer${apikey}`
    }
})
export default axiosApi