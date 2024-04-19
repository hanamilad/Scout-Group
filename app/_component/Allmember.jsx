"use client"

import React, { useEffect, useState } from 'react'
import FunApi from '../_axios/FunApi'
import { Save } from 'lucide-react';



function Allmember() {
  const [members,setmembers]=useState()

const getAllmembers=()=>{
  
  FunApi.getallmember().then(
    res=>setmembers(res.data.data) 
  )
}
useEffect(()=>{
  getAllmembers()
},[])
  return (
<div className="overflow-x-auto    ">
  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
    <thead className="ltr:text-left rtl:text-right">
      <tr>
        <th className="sticky inset-y-0 start-0 bg-white px-4 py-2">
          <label htmlFor="SelectAll" className="sr-only">Select All</label>
          { new Date().toISOString().split('T')[0]}
        </th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" >name</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">group</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
    {members?.map((member,index)=>{
      return(
<>
        <tr className='text-center' key={member.id}>
        <td className="sticky inset-y-0 start-0 bg-white px-4 py-2">
        <span>{index}_</span>
          <input className="size-5 rounded border-gray-300" type="checkbox" id="Row1"              
           />
        </td>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{member.attributes.Name}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{member.attributes.group}</td>    
      </tr>
</>
      )
    })
    }
    </tbody>
  </table>
  <div className=' cursor-pointer bottom-0 left-0 fixed'><Save size={48} color="#000000"  strokeWidth={1.5} /></div>
</div>
  )
}

export default Allmember