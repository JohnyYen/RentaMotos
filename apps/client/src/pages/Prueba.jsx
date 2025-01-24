import React, { useState } from 'react'
import CreateClient from './login/components/CreateClient';

const Prueba = () => {
    const [visible, setVisible] = useState(false)
  return (
    <>
        <CreateClient/>      
    </>
  )
}

export default Prueba