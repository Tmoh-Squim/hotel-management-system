import React from 'react'
import { ButtonProps } from '../types/types'

const CustomButton = ({title,onClick}:ButtonProps) => {
  return (
    <div className='px-4 py-2 rounded-lg bg-blue-300 hover:bg-blue-500 cursor-pointer text-background' onClick={onClick}>
        <h1 className='font-semibold text-center'>{title}</h1>
    </div>
  )
}

export default CustomButton