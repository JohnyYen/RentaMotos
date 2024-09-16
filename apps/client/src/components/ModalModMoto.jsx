import { Button, Flex, Form, InputNumber, Modal, Select } from 'antd'
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext';
import { useTranslation } from 'react-i18next';

const response = await axios.get('http://localhost:3000/api/situation');
let dataSource;

if(response.status === 200)
  dataSource = response.data;

const ModalModMoto = ({isOpen, setOpen}) => {

    const [form] = Form.useForm();
    const {row} = useContext(GlobalContext);

    const [color, setColor] = useState('');
    const [cantKm, setCantKm] = useState(0);
    const [Situacion, setSituacion] = useState('');

    const [t] = useTranslation("global");

  const margin = 0;
  const handlePetition = async () => {

    const moto = {
      matricula:row?.matricula,
      color:color,
      cantKm:cantKm,
      marca:row?.marca,
      modelo:row?.modelo,
      situacion:Situacion
    }


    if(color && cantKm && Situacion){
      const res = await axios.patch(`http://localhost:3000/api/moto/${moto.matricula}`, moto);

      window.location.reload();
    }
      
  }
  return (
    <Modal afterClose={() => form.resetFields()}  okButtonProps={{htmlType:'submit'}} destroyOnClose={true} title={"Modificar Moto"}
      open={isOpen} centered={true} onCancel={setOpen} onClose={setOpen} onOk={() => handlePetition() }
      modalRender={(dom) => (
        <Form  form={form} labelCol={{span: 12}}  wrapperCol={{span: 16}} autoComplete="off" initialValues={{remember: false,}} layout='vertical'>
          {dom}
      </Form>
      )}>   
      <Form.Item label="Color:" name={"color"} rules={[{required:true, message:t("messageError.emptyColor")}]}>
          <Select style={{marginBottom:margin}}  onSelect={(value) => setColor(value)} placeholder={row?.color}>
              <Select.Option value='Rojo'>{t("mainContent.table.colors.red")}</Select.Option>
              <Select.Option value='Azul'>{t("mainContent.table.colors.blue")}</Select.Option>
              <Select.Option value='Negro'>{t("mainContent.table.colors.black")}</Select.Option>
              <Select.Option value='Blanco'>{t("mainContent.table.colors.white")}</Select.Option>
              <Select.Option value='Rojo-Negro'>{t("mainContent.table.colors.red-black")}</Select.Option>
              <Select.Option value='Azul-Negro'>{t("mainContent.table.colors.blue-black")}</Select.Option>
              <Select.Option value='Rojo-Blanco'>{t("mainContent.table.colors.red-white")}</Select.Option>
              <Select.Option value='Blanco-Negro'>{t("mainContent.table.colors.white-black")}</Select.Option>
          </Select>
        </Form.Item>

       <Form.Item label="Cantidad de Kilometros:" name={"cantKm"} rules={[{required:true, message:'El campo de cantKm no debe estar vacio'},
        {min:row?.kmRecorridos, message: "No puede ser menor a la cantidad actual de Kilometros"}
       ]}>
        <InputNumber min={row?.kmRecorridos} style={{marginBottom:margin}} onChange={(e) => setCantKm(e)} placeholder={row ? row.kmRecorridos : 0}/>
       </Form.Item>

        <Form.Item label={t("modal.situation") + ":"} name={"situacion"} rules={[{required:true, message:("messageError.emptySituation")}]}>
        <Select style={{marginBottom:margin}} onSelect={(e) => setSituacion(e)} placeholder={row?.situacion ? row.situacion : t("modal.Situation")}>
            {dataSource.map((item, i) => (
              <Select.Option key={i} value={item.situacion}>{item.situacion}</Select.Option>
            ))}
        </Select>
        </Form.Item>
        
       
    </Modal>
  )
}

export default ModalModMoto