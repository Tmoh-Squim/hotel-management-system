import Link from 'next/link'
import React from 'react'
import { appBarLinks } from '../static/static'
import { AiOutlineUser } from 'react-icons/ai'

const AppBar = () => {
  return (
    <div
    className='h-[60px] flex px-4 justify-between text-background items-center bg-blue-400 w-full'
    >
      <div>
        <Link href={"/"} className='text-2xl font-bold cursor-pointer'>
          Squim's Hotel
        </Link>
      </div>

      <div className='flex gap-10 items-center font-semibold'>
        {
          appBarLinks.map((item,index)=>(
            <div key={index}>
              <Link  href={item.path} >{item.title}</Link>
            </div>
          ))
        }

      </div>

      <div className='w-min'>
        <AiOutlineUser size={50} className='cursor-pointer' />
      </div>

    </div>
  )
}

export default AppBar