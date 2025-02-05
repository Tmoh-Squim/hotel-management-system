import React from 'react'
import CustomTextField from './components/Myinput'
import AppBar from './components/AppBar'

const page = () => {
  return (
    <div>
      <AppBar/>
      <CustomTextField type="string" placeholder="hi there" />
    </div>

  )
}

export default page