import React from 'react'
import { ButtonProps } from '../types/types'
import Loader from './Loader'

const CustomButton = ({ title, onClick, loading }: ButtonProps) => {
  return (
    <div 
      className={`px-4 py-2 rounded-lg bg-blue-300 hover:bg-blue-500 cursor-pointer text-background flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
      onClick={!loading ? onClick : undefined}
    >
      {loading ? (
        <Loader h="h-8" w="w-8" />
      ) : (
        <h1 className='font-semibold text-center'>{title}</h1>
      )}
    </div>
  )
}

export default CustomButton
