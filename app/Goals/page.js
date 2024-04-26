"use client"

import React, { useEffect, useState } from 'react'
import FunApi from '../_axios/FunApi'
import { CirclePlus, CircleX, Pencil, Save, Trash2 } from 'lucide-react'
import Breadcrumb from '../_component/Breadcrumb '
import { useUser } from '@clerk/nextjs'

function Goals() {
  const {user}=useUser()
const [Goals,setGoals]=useState([])
const [editgoals, seteditgoals] = useState(null);
const [isopen,setisopen]=useState(false)  
const [newgoals,setnewgoals]=useState({
  Namesubject:"",
})
const change = (e) => {
  setnewgoals({ ...newgoals, [e.target.id]: e.target.value });
};
const addgoal=async (e)=>{
  e.preventDefault();
  const data={
    data:{
      Namesubject:newgoals.Namesubject,
    } 
  };
  await FunApi.addgoals(data).then(res=>
  window.location.reload()
  )
  .catch(rej=>console.log(rej))
}
const getallgoals= ()=>{
  FunApi.getGoals().then(res=>
    setGoals(res.data.data)
  )
} 
const deletgoals = (id) => {
  FunApi.deletgoals(id).then(res => {
    getallgoals();
  }).catch(rej => console.log(rej));
}
const handleCancel = () => {
  seteditgoals(null);
};

const handleSave = async () => {
  try {
   const updatedgoals = editgoals.attributes; 
    await FunApi.updategoals(editgoals.id, updatedgoals); 
    const updateGoalsFinal = Goals.map((goal) => {
      if (goal.id === editgoals.id) {
        return editgoals; 
      }
      return goal;
    });
    setGoals(updateGoalsFinal);
    seteditgoals(null);
    console.log(editgoals)
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

const updategoals=(id,user)=>{
  seteditgoals(user); 
}
const Toggle=()=>{
  setisopen(!isopen)
}

useEffect(()=>{
  getallgoals()
},[])





  return (
    <>
      <Breadcrumb padeName="Goals" />
  
<fieldset>
  <div className="space-y-2">
 {Goals?.map((goal,index)=>{
  return editgoals?.id === goal.id ?(
    <>
    <label
      key={editgoals.id}
      htmlFor=""
      className="flex cursor-pointer items-start gap-4 rounded-lg border  justify-between border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
    >
           <div className='flex'>
           <div className='absolute cursor-pointer bottom-0 right-0 ' onClick={() => handleSave(editgoals)}><Save size={48} color="#000000"  strokeWidth={1.5} /></div>
<div className='absolute cursor-pointer bottom-0 right-14 ' onClick={handleCancel}><CircleX size={48} color="#FA0000"  strokeWidth={3} /></div>
           </div>

      <div>
        <input className="font-medium text-gray-900 p-3 text-center "
        value={editgoals.attributes.Namesubject}
        type='text'

onChange={(e) => seteditgoals({ ...editgoals,  attributes: { 
...editgoals.attributes, 
Namesubject: e.target.value 
}})}
        
        />
      </div>
      <div className="flex items-center">
        &#8203;
        <input 
        type="checkbox" 
        checked={editgoals.attributes.checked}
                  onChange={(e) => seteditgoals({ ...editgoals,  attributes: { 
          ...editgoals.attributes, 
          checked: e.target.checked 
}})}   
  className="size-4 rounded border-gray-300" id="Option1" />
        <span>-{index}</span>
      </div>

    </label>
    </>
   ):(
      <>
      <label
      key={goal.id}
      htmlFor=""
      className="flex cursor-pointer items-start gap-4 rounded-lg border  justify-between border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
    >
           <div className='flex'>
           <div onClick={()=>updategoals(goal.id,goal)}> <Pencil size={16} color="#000000" strokeWidth={1.5} className='mr-2 cursor-pointer' /></div>
        <div onClick={()=>deletgoals(goal.id)}> <Trash2  size={16} color="#ff0000" strokeWidth={1.5} className='cursor-pointer' /></div>
           </div>

      <div>
        <strong className="font-medium text-gray-900">{goal.attributes.Namesubject}</strong>
      </div>
      <div className="flex items-center">
        &#8203;
        <input type="checkbox"  checked={goal.attributes.checked}   className="size-4 rounded border-gray-300" id="Option1" />
        <span>-{index}</span>
      </div>

    </label>

    </>
  )
    
  }) }
  <div className='fixed bottom-3 left-3 cursor-pointer'>
    <CirclePlus size={48} color="#006614" strokeWidth={2.75} onClick={Toggle} />
    {
      isopen? 
      

    <form action="#" onSubmit={()=>{user? addgoal : alert("انتا ليس لديك الصالحيه لهذه الخاصيه  ") }} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 fixed bottom-[30px] left-[40px]" >
      <div>
        <label htmlFor="email" className="sr-only">Email</label>

        <div className="">  
          <input
            type="text"
            name='Namesubject'
            id='Namesubject'
            onChange={change}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-center border"
            placeholder="الموضوع"
          />

      </div>
      </div>
      <button
        type="submit"
        className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
      >
        Add 
      </button>
    </form>
 : <></>
    }









    
    </div>

  </div>
</fieldset>
  </>
  )
}

export default Goals