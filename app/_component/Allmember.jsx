"use client"

import React, { useEffect, useState } from 'react'
import FunApi from '../_axios/FunApi'
import { Save } from 'lucide-react';
import { useUser } from '@clerk/nextjs';



function Allmember() {
  const {user}=useUser()
  const [members,setmembers]=useState()
  const [attendancedate,setattendancedate]=useState([])
  const [selectedMembersIds, setSelectedMembersIds] = useState([]);




const getAllmembers=()=>{
  FunApi.getallmember().then(
    res=>setmembers(res.data.data)  
  )
}
const getattendancedate= async()=>{
  FunApi.getAttendance().then(
    res=> setattendancedate(res.data.data) 
  )
}

useEffect(()=>{
  getAllmembers();
  getattendancedate()

},[])

const checkboxvalue= (id,member)=>{
  const today =  new Date().toISOString().split("T")[0];
  for (const item of member.attributes.attendances.data) {
      if (item.attributes.date === today) {
        return true 
      }else{
        undefined
      }
  }
}


const recordAttendance = async (membersIds, status) => {
const data = {
    data: {
      members: membersIds,
      date: new Date().toISOString().split('T')[0],
      status: status,
    }
  };
 await FunApi.postAttendance(data)
.then(res=>console.log(res))
};




  return (
<div className="overflow-x-auto    ">
  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
    <thead className="ltr:text-left rtl:text-right">
      <tr>
        <th className="sticky inset-y-0 start-0 bg-white px-4 py-2">
          <label htmlFor="SelectAll" className="sr-only">Select All</label>
          { new Date().toISOString().split('T')[0]}
        </th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">group</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" >name</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
    {members?.map((member,index)=>{
      return( 
<>
        <tr className='text-center' key={member.id}>
        <td className="sticky inset-y-0 start-0 bg-white px-4 py-2">  
        <span>{index}_</span>
          <input className="size-5 rounded border-gray-300" type="checkbox" 
checked={checkboxvalue(member.id,member)}
onChange={(e) => {
    if (e.target.checked) {
      setSelectedMembersIds(prev => [...prev, member.id]);
    } else {
      setSelectedMembersIds(prev => prev.filter(id => id !== member.id));
    }
  }}                                          
           />
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{member.attributes.group}</td>    
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{member.attributes.Name}</td>
      </tr>
</>
      )
    })
    }
    </tbody>
  </table>
  <div className=' cursor-pointer bottom-0 left-0 fixed' onClick={ ()=>{user ? recordAttendance(selectedMembersIds, true) : alert("انتا ليس لديك الصالحيه لهذه الخاصيه  ") }}><Save size={48} color="#000000"  strokeWidth={1.5} /></div>
</div>
  )
}

export default Allmember