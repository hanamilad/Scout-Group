
const { default: axiosApi } = require("./MemberApi");

const getallmember=()=>axiosApi.get("/api/members?populate=*&pagination[pageSize]=100")
const postUserData=(data)=>axiosApi.post("/api/members",data)
const deleteuser = (id) => axiosApi.delete(`/api/members/${id}`);
const updateuser = (id,data) => axiosApi.put(`/api/members/${id}`,{data:data});
const getGoals =()=>axiosApi.get("/api/goals?pagination[pageSize]=100")
const deletgoals=(id)=>axiosApi.delete(`/api/goals/${id}`)
const updategoals=(id,data)=>axiosApi.put(`/api/goals/${id}`,{data:data})
const addgoals=(data)=>axiosApi.post("/api/goals",data) 
const postAttendance=(data)=>axiosApi.post("/api/attendances",data)
const getAttendance=()=>axiosApi.get("/api/attendances?populate=*")    
// const updateAttendance=(id,data)=>axiosApi.put(`/api/attendances/${id}?populate=*`,data)
// const fillterAttendance=(date)=>axiosApi.get(`/api/attendances?filters[date][$eq]=${date}`)


// eslint-disable-next-line import/no-anonymous-default-export
export default{
    getallmember,
    postUserData,
    deleteuser,
    updateuser,
    getGoals,
    deletgoals,
    updategoals,
    addgoals,
    postAttendance,
    getAttendance,
    // updateAttendance,
    // fillterAttendance
}