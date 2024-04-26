"use client"
import React, {  useEffect,useState } from 'react'
import Breadcrumb from '../_component/Breadcrumb '
import FunApi from '../_axios/FunApi'


function AllAttendance() {
    const [members,setmembers]=useState()



const getAtmembers=()=>{
    FunApi.getallmember().then(res=>setmembers(res.data.data))
}
useEffect(()=>{
    getAtmembers()
},[])



  return (
    <>
        <Breadcrumb padeName="AllAttendance" />
<div className="overflow-x-auto rounded-lg border border-gray-200 ">
  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
    <tbody className="divide-y divide-gray-200  ">
    {
    members?.map((member) => {
        return (
            <tr key={member.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {member.attributes.Name}
                </td>
                {member?.attributes?.attendances?.data.map((ele) => (
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700" key={ele.id}>
                        <input type="checkbox"  checked={ele.attributes.status}/>
                    </td>
                ))}
            </tr>
        );
    })
}

    </tbody>
  </table>
</div>


        


    </>
  )
}

export default AllAttendance