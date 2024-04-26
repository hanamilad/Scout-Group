"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import photo from '../../public/photo.png'
import Link from 'next/link'
import {CircleX} from 'lucide-react'
import { useUser } from '@clerk/nextjs'

function Nav() {
  const {user}=useUser();
  
    const [isOpen, setIsOpen] = useState(false); 
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);  
    };


  return (
    <header className="bg-white">
    <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
      <Link className="block text-teal-600" href="/">
        <span className="sr-only">Home</span>
<Image className='image' src={photo} alt='scout' width={40} height={40} priority={false} />
     
      </Link>
  
      <div className="flex flex-1  items-center justify-end md:justify-between">
        <nav aria-label="Global" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <Link className="text-gray-500 transition hover:text-gray-500/75" href="/AddMember"> اضافه </Link>
            </li>
  
            <li>
              <Link className="text-gray-500 transition hover:text-gray-500/75" href="/ScoutMembers"> الاسماء </Link>
            </li>
            <li>
              <Link className="text-gray-500 transition hover:text-gray-500/75" href="/Goals"> اهداف السنه </Link>
            </li>
            <li>
              <Link className="text-gray-500 transition hover:text-gray-500/75" href="/AllAttendance"> الغياب  </Link>
            </li>
          </ul>
        </nav>
  
        <div className="flex items-center gap-4">
          <div className="sm:flex sm:gap-4">
          {
            user? 
            <div>
              <span className='bg-teal-600 text-white p-2'>{user.username }</span>
            </div>
            :
            <Link
              className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
              href="/sign-in"
            >
              Login
            </Link>
          }

          </div>
  
          <button
          onClick={toggleMenu}
            className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {isOpen && (

            <nav   aria-label="Global" className=" md:block fixed top-0 bottom-0 z-10 right-0 p-4 bg-teal-600">
          <ul className="flex flex-col items-center gap-[2.5rem] font-bold  mt-4 text-lg">
            <li>
              <Link className="text-white transition hover:text-black  " href="/AddMember"> اضافه </Link>
            </li>
  
            <li>
              <Link className="text-white transition hover:text-black" href="/ScoutMembers"> الاسماء </Link>
            </li>
            <li>
              <Link className="text-white transition hover:text-black" href="/Goals">اهداف السنه  </Link>
            </li>
            <li>
              <Link className="text-white transition hover:text-black" href="/AllAttendance">الغياب   </Link>
            </li>
          </ul>
          <CircleX size={30} color="black" className='absolute top-1 left-1 '  strokeWidth={3} onClick={toggleMenu} />
        </nav>
  
    )}
        </div>
      </div>
    </div>
  </header>
  )
}

export default Nav