import Link from 'next/link'
import React from 'react'

const Details = () => {
  return (
    <div className='w-full min-h-screen '>
      <div className='flex justify-center w-full bg-blue-50 items-center py-10'>
        <div className='flex-1 flex flex-col items-center'>
          <h1 className='text-3xl font-bold'>8.1<span className='text-sm font-semibold'>/10</span></h1>
          <p className='text-4xl text-blue-950 font-bold'>Booking.com</p>
        </div>
        <div className='flex-1 flex flex-col items-center'>
          <h1 className='text-3xl font-bold'>4.5<span className='text-sm font-semibold'>/5</span></h1>
          <p className='text-4xl text-blue-500 font-bold'>Facebook</p>
        </div>
        <div className='flex-1 flex flex-col items-center'>
          <h1 className='text-3xl font-bold'>4.4<span className='text-sm font-semibold'>/5</span></h1>
          <p className='text-4xl text-blue-950 font-bold'>Google</p>
        </div>
      </div>
      <div className='flex'>
        <div className='w-1/2 h-full'>
        <img src="/booking.jpg" alt="" />
        </div>
        <div className='flex-1 px-4 bg-background mx-auto flex justify-between items-center'>
        <div>
          <h1 className='text-4xl text-center text-foreground font-semibold my-4'>Your Home Away From Home!</h1>
          <p className='text-center'>
          Experience the essence of Sylhet at our welcoming hostel, where travelers find comfort and community beneath the tea-covered hills and by the Surma River.
          </p>
          <div className='flex justify-center items-center mt-6'>
          <Link href={"/restaurant"}>
          <div className="my-4 py-4 px-8 text-white rounded-md cursor-pointer font-semibold bg-amber-950 btn w-max ">
            More About Us!
          </div>
        </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Details
