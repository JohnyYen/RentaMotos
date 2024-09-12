import React, { useState } from 'react'
import ModalCreateClient from '../../components/ModalCreateClient'
import ModalCreateMoto from '../../components/ModalCreateMoto'
import ModalModClient from '../../components/ModalModClient';
import ModalModMoto from '../../components/ModalModMoto';
import ModalModContract from '../../components/ModalModContract';
import ModalCreateContract from '../../components/ModalCreateContract';

const Prueba = () => {
    const [visible, setVisible] = useState(false)
  return (
    <>
        <button onClick={() => {setVisible(!visible);}}>
            Click Me
        </button>
        {/* <ModalModMoto isOpen={visible} setVisible={() => setVisible(!visible)}/> */}
        {/* <ModalCreateMoto isVisible={visible} setVisible={() => setVisible(!visible)}/> */}
        <ModalCreateClient isVisible={visible} setVisible={() => setVisible(!visible)}/>
    </>
  )
}

export default Prueba