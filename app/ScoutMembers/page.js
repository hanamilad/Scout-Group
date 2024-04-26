"use client"
import React, { useEffect, useState } from 'react'
import Breadcrumb from '../_component/Breadcrumb '
import FunApi from '../_axios/FunApi'
import {CircleX, Pencil,Save,Trash2} from 'lucide-react'
import { useUser } from '@clerk/nextjs'


function ScoutMembers() {
  const {user}=useUser()
  const [members,setmembers]=useState()
  const [editingUser, setEditingUser] = useState(null);

  const Getallmembers = async () => {
    try {
      const response = await FunApi.getallmember();
      setmembers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

const deletemember = (id) => {
  FunApi.deleteuser(id).then(res => {
    console.log(res);
    Getallmembers();
  }).catch(rej => console.log(rej));
}
const handleCancel = () => {
  setEditingUser(null);
};


const handleSave = async () => {
  try {
   const updatedUser = editingUser.attributes; 
    await FunApi.updateuser(editingUser.id, updatedUser); 
    const updatedMember = members.map((member) => {
      if (member.id === editingUser.id) {
        return editingUser; 
      }
      return member;
    });
    setmembers(updatedMember);
    setEditingUser(null);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

const updatemember=(id,user)=>{
  setEditingUser(user); 
}
useEffect(()=>{
  Getallmembers()
},[])

  return (
    <div>
       <Breadcrumb padeName='ScoutMembers' />
<div className="overflow-x-auto">
  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
    <thead className="ltr:text-left rtl:text-right">
      <tr>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">number</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date of Birth</th>
        <th className="w-[150px]  px-4 py-2 font-medium text-gray-900">Address</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">group</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200">
    {members?.map((member,index)=>{

     return editingUser?.id === member.id ?(   
      <>
      <tr className="odd:bg-gray-50 text-center" key={editingUser.id}>
<td  className="whitespace-nowrap px-4 py-2 text-gray-700">
<input className="rounded-lg border-gray-200 p-3 text-sm"
placeholder='Name'
type="text"
value={editingUser?.attributes?.Name}
onChange={(e) => setEditingUser({ ...editingUser,  attributes: { 
...editingUser.attributes, 
Name: e.target.value 
}})}
/>
</td>
<td  className="whitespace-nowrap px-4 py-2 text-gray-700">
<input
className="rounded-lg border-gray-200 p-3 text-sm"
placeholder='number'
type="text"
value={editingUser?.attributes?.number}
onChange={(e) => setEditingUser({ ...editingUser, attributes: { 
...editingUser.attributes,  number: e.target.value }})}
/>
</td>
<td  className="whitespace-nowrap px-4 py-2 text-gray-700">
<input
type="date"
className="rounded-lg border-gray-200 p-3 text-sm"
placeholder='Data'
value={editingUser?.attributes?.Data}
onChange={(e) => setEditingUser({ ...editingUser, attributes: { 
...editingUser.attributes,  Data: e.target.value }})}
/>
</td>
<td  className="whitespace-nowrap px-4 py-2 text-gray-700">
<input className="rounded-lg border-gray-200 p-3 text-sm"
placeholder='description'
type="text"
value={editingUser?.attributes?.description}
onChange={(e) => setEditingUser({ ...editingUser,attributes: { 
...editingUser.attributes,  description: e.target.value }})}
/>
</td>
<td  className="whitespace-nowrap px-4 py-2 text-gray-700">
<select
name="group"
id="group"
value={editingUser?.attributes?.group}
className="mt-1.5 w-fit rounded-lg border-gray-300 text-gray-700 sm:text-sm p-3"
onChange={(e) => setEditingUser({ ...editingUser, attributes: { 
...editingUser.attributes,  group: e.target.value }})}
>
<option value="الأسد">الأسد</option>
<option value="الذئب">الذئب</option>
<option value="النسر">النسر</option>
<option value="الحيه">الحيه</option>
<option value="الفهد">الفهد</option>
<option value="النمر">النمر</option>
</select>
</td>

<td  className="whitespace-nowrap px-4 py-2 text-gray-700">

</td>
</tr>

<div className='absolute cursor-pointer bottom-0 left-0 ' onClick={() => handleSave(editingUser)}><Save size={48} color="#000000"  strokeWidth={1.5} /></div>
<div className='absolute cursor-pointer bottom-0 left-14 ' onClick={handleCancel}><CircleX size={48} color="#FA0000"  strokeWidth={3} /></div>
</>
     )
:
(
          <>
          <tr className="odd:bg-gray-50 text-center" key={member.id}>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"  ><span>{index}_</span>{member?.attributes?.Name}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{member?.attributes?.number}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{member?.attributes?.Data}</td>
        <td className="whitespace-normal px-4 py-2  text-gray-700">{member?.attributes?.description}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{member?.attributes?.group}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700 flex" >
        <div></div>
        <div onClick={()=>{user? updatemember(member.id,member) : alert("انتا ليس لديك الصالحيه لهذه الخاصيه  ")}}> <Pencil size={16} color="#000000" strokeWidth={1.5} className='mr-2 cursor-pointer' /></div>
        <div onClick={()=>{user? deletemember(member.id) : alert("انتا ليس لديك الصالحيه لهذه الخاصيه  ") }}> <Trash2 size={16} color="#ff0000" strokeWidth={1.5} className='cursor-pointer' /></div>
       </td>
      </tr>
          </>
)
        
      })
    }
    </tbody>
  </table>
  </div>
    </div>
  )
}

export default ScoutMembers


