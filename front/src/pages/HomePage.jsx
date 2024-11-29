import React from 'react'
import Home from '../components/Home'
import Navbar from '../components/Navbar'
import NoteBox from '../components/NoteBox'

const HomePage = () => {
  return (
    <>
        <Navbar/>
        <Home/>
        <NoteBox/>
    </>
  )
}

export default HomePage