"use client"

import React, {useState } from 'react';   
import FunApi from '../_axios/FunApi';


function Form() {
  const [group,setgroup]=useState({
    Name:"",
    number:"",
    group:"",
    description:"",
    Data:"",
  })
  const change = (e) => {
    setgroup({ ...group, [e.target.id]: e.target.value });
  };
  const addmember=(e)=>{
    e.preventDefault();
    const data={
      data:{
        Name:group.Name,
        number:group.number,
        group:group.group,
        description:group.description,
        Data:group.Data
      } 
    };
    FunApi.postUserData(data).then(res=>
      console.log(res.data),
      alert("save sccuss")
    )
    .catch(rej=>console.log(rej))
  }











  
  return (
<section className="bg-gray-100"> 
  <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-x-16 gap-y-8 ">
      <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
          <form action="#"  className="space-y-4" onSubmit={addmember}   >
            <div>
              <label className="sr-only" htmlFor="name">Name</label>
              <input
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Name"
                type="text"
                id="Name"
                onChange={change}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="sr-only" htmlFor="email">description</label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="address"
                  type="text"
                  id="description"
                  onChange={change}
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="phone ">phone </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="phone"
                  type="text"
                  id="number"
                  onChange={change}
                
                />
              </div>
            </div>
            <div>
  <select
    name="group"
    id="group"
    className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm p-3"
    onChange={change}
  >
    <option value="الأسد">الأسد</option>
    <option value="الذئب">الذئب</option>
    <option value="النسر">النسر</option>
    <option value="الحيه">الحيه</option>
    <option value="الفهد">الفهد</option>
    <option value="النمر">النمر</option>
  </select>
</div>

            <div>
              <label className="sr-only" htmlFor="message">Date</label>
              <input type='date' id='Data'
              onChange={change}
                />
            </div>

            <div className="mt-4">
              <button  
                className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
              >
                Send 
              </button>
            </div>
          </form>
      </div>
    </div>
  </div>
</section>
  )
}

export default Form