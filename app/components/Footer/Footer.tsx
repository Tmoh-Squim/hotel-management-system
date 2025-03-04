import React from 'react'
import { AiFillPhone, AiOutlineFacebook, AiOutlineMail, AiOutlineTwitter, AiOutlineYoutube } from 'react-icons/ai'
import { FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='w-full px-10 py-8 bg-background'>
        <div className='flex justify-between my-2 '>
            <div>
            <h1
            className="text-2xl font-bold cursor-pointer hover:text-foreground transition-colors duration-300"
          >
            Squim&apos;s Hotel
          </h1>
            </div>
            <div className=''>
                <p className=' text-foreground flex items-center gap-2 font-semibold'><FaMapMarkerAlt /> 2nd Floor, New Shamoli Shopping Centre, Zindabazar, Sylhet, Sylhet, Bangladesh </p>
                <p className='flex items-center gap-2 justify-center mt-2'><AiFillPhone /> +254748143442 <span className='flex items-center gap-2'><AiOutlineMail /> squimstech@gmail.com</span></p>
                <p className='text-center my-4 font-bold'>
                    SquimHotel 2025 All Rights Reserved
                </p>

            </div>
            <div className='flex items-center gap-4'>
                <div className='w-[50px] h-[50px] rounded-full cursor-pointer bg-foreground text-background flex justify-center items-center'>
                    <AiOutlineFacebook />
                </div>
                <div className='w-[50px] h-[50px] rounded-full cursor-pointer bg-foreground text-background flex justify-center items-center'>
                    <AiOutlineTwitter />
                </div>
                <div className='w-[50px] h-[50px] rounded-full cursor-pointer bg-foreground text-background flex justify-center items-center'>
                    <AiOutlineYoutube />
                </div>
            </div>
        </div>
        <div>
            <p className='text-center text-sm text-foreground'>Created by Timothy. Developer at webwizardsmedia.com</p>
        </div>
    </footer>
  )
}

export default Footer