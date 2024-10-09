import React from 'react'
import Signup from './Signup'
import LoginPage from './LoginPage'


const Comb = ({isSIGN}) => {
  return (
    <>
        {isSIGN ? <LoginPage/>:<Signup/>}
    </>
    
  )
}

export default Comb