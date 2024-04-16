const { default: axiosmember } = require("./MemberApi");

const getallmember=()=>axiosmember.get("/api/members")
const postUserData=(data)=>axiosmember.post("/api/members",data)
const deleteuser = (id) => axiosmember.delete(`/api/members/${id}`);
const updateuser = (id,data) => axiosmember.put(`/api/members/${id}`,{data:data});


// eslint-disable-next-line import/no-anonymous-default-export
export default{
    getallmember,
    postUserData,
    deleteuser,
    updateuser
}