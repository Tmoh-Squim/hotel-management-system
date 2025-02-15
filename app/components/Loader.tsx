import React from 'react'

interface LoaderProps {
    h:string,
    w:string
}
const Loader = ({h,w}:LoaderProps) => {
  return (
    <div className={`animate-spin  ${h} ${w} border-4 border-white border-t-transparent rounded-full`}></div>
  )
}

export default Loader