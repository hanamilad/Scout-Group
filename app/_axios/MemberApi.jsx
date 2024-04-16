const { default: axios } = require("axios");

const apikey=process.env.RESET_API_KEY;
const apiurl="http://localhost:1337"

const axiosmember=axios.create({
    baseURL:apiurl,
    headers:{
        Authorization:`Bearer${apikey}`
    }
})
export default axiosmember