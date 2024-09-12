import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'

const EliminarWorker = ({isOpen, setOpen}) => {
    const {row} = useContext(GlobalContext);

    const EWorker =  () => {
        
    }
  return (
    <Modal title={'Eliminar Trabajador'} centered={true} open={isOpen} onClose={setOpen} onCancel={setOpen} onOk={Econtrato}>
        <Typography.Title level={3}>¿Estás seguro que deseas eliminar el contrato?</Typography.Title>
      </Modal> 
  )
}

export default EliminarWorker