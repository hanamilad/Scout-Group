const { default: axiosApi } = require("./MemberApi");

const getallmember=()=>axiosApi.get("/api/members")
const postUserData=(data)=>axiosApi.post("/api/members",data)
const deleteuser = (id) => axiosApi.delete(`/api/members/${id}`);
const updateuser = (id,data) => axiosApi.put(`/api/members/${id}`,{data:data});
const getGoals =()=>axiosApi.get("/api/goals")
const deletgoals=(id)=>axiosApi.delete(`/api/goals/${id}`)
const updategoals=(id,data)=>axiosApi.put(`/api/goals/${id}`,data)
const addgoals=(data)=>axiosApi.post("/api/goals",data)


// eslint-disable-next-line import/no-anonymous-default-export
export default{
    getallmember,
    postUserData,
    deleteuser,
    updateuser,
    getGoals,
    deletgoals,
    updategoals,
    addgoals
}