import { Input, Modal, Select } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'

const response = await axios.get('http://localhost:3000/api/mun')
let dataSource = [];
if(response.status === 200){
    dataSource = response.data;
}

const ModalCreateWorker = ({isOpen, setOpen}) => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [mun, setMun] = useState('');
    const margin = 15;
    const handlePetition = async () =>{
        const worker = {
            user_name: name,
            password: password,
            mun: mun
        }

        //console.log(worker);
        const res = await axios.post('http://localhost:3000/api/user/worker', worker);

        console.log(res)
    }
  return (
    <Modal centered={true} title='Crear Trabajador' open={isOpen} onClose={setOpen} onCancel={setOpen} onOk={handlePetition}>
         <Input onChange={(e) => setName(e.target.value)} style={{marginBottom:margin, width:300}}  placeholder='Ingrese su nombre'/>
         <Input.Password onChange={(e) => setPassword(e.target.value)} style={{marginBottom:margin, width:300}} placeholder='Ingrese su contraseña'/>
        <Select onSelect={(value) => setMun(value)} style={{marginBottom:margin,width:200}} placeholder="Municipio">
            {
                dataSource.map((item, i) => (
                   <Option key={i}  value={item.nommun}>{item.nommun}</Option>
                ))
            }
                    </Select>
    </Modal>
  )
}

export default ModalCreateWorker