import Image from 'next/image'
import React from 'react'
import { ProductProps } from '../types/types'

const HotelCard = ({product}:ProductProps) => {
  return (
    <div className='block gap-3'>
        <Image width={250} height={250} src={product.images[0]} alt={product.title}/>
        
    </div>
  )
}

export default HotelCard