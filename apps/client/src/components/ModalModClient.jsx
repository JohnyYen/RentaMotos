import { Col, Flex, Form, Input, InputNumber, message, Modal, Row, Select } from 'antd'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { GlobalContext } from '../context/GlobalContext';
import { useTranslation } from 'react-i18next';

const response = await axios.get('http://localhost:3000/api/mun');
let dataSource = [];
if(response.status === 200)
  dataSource = response.data;

const ModalModClient = ({isOpen, setOpen}) => {

    const [form] = Form.useForm();
    const {row} = useContext(GlobalContext);
    const [edad, setEdad] = useState(0);
    const [Municipio, setMunicipio] = useState("");
    const [name, setName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [lastName, setLastName] = useState("");
    const [secondLast, setSecondLast] = useState("");
    const [numCont, setNumCont] = useState("");
    const [t] = useTranslation("global");

    const handlePetition = async () => {

      //console.log(row);

      const client = {
        idCliente: row?.ci,
        nombre: name,
        segNombre: secondName,
        primApellido: lastName,
        segApellido: secondLast,
        edad: edad,
        municipio: Municipio,
        sexo: 'F',
        numCont:numCont
      }

      if(name && lastName && edad && Municipio && numCont){
        const res = await axios.patch(`http://localhost:3000/api/client/${row?.ci}`, client);

        message.success('Creado con exito');
        window.location.reload();
      }
    }
    const margin = 0;
  return (
    <Modal okButtonProps={{htmlType:'submit'}} afterClose={() => form.resetFields()}   destroyOnClose={true} title={t("modal.modifyClient")} centered={true} open={isOpen} onCancel={setOpen} onClose={setOpen} onOk={handlePetition}
    modalRender={(dom) => (
      <Form  form={form} labelCol={{span: 16}}  wrapperCol={{span: 28}} autoComplete="off" initialValues={{remember: false,}} layout='vertical'>
          {dom}
      </Form>
  )}
    >

        <Flex vertical={true}>

         <Row gutter={24}>
           <Col span={12}>
              <Form.Item label={t("profile.name") + ":"} name="name" rules={[{required: true,message: t("messageError.emptyName"),},
                {min:4, message: t("messageError.minCharName")},
                {max:20, message: t("messageError.maxCharName")},
              ]}>
                <Input style={{marginBottom:margin, width: 200}} onChange={(e) => setName(e.target.value)} placeholder={t("profile.name")}/>
              </Form.Item>

              <Form.Item label={t("profile.middleName") + ":"} name="secondName" rules={[{min: 4,message: t("messageError.minCharMiddleName"),},
                {max:20,message: t("messageError.maxCharMiddleName"),}
              ]}>
                <Input style={{marginBottom:margin, width: 200}} onChange={(e) => setSecondName(e.target.value)} placeholder={t("profile.lastName")}/>  
              </Form.Item>


              <Form.Item label={t("profile.lastName") + ":"} name="primApellido" rules={[{required: true,message: t("messageError.emptyLastName"),},
                {min:4, message: t("messageError.minCharLastName")},
                {max:25, message: t("messageError.maxCharLastName")},
              ]}>
              <Input style={{marginBottom:margin, width: 200}} onChange={(e) => setLastName(e.target.value)} placeholder={t("profile.lastName")}/>        
              </Form.Item>


              <Form.Item label={t("profile.secondLastName") + ":"} name="segApellido" rules={[{min: 4,message: t("messageError.minCharLastName"),},
                {max:25 ,message: t("messageError.maxCharLastName"),},
              ]}>
                <Input style={{marginBottom:margin, width: 200}} onChange={(e) => setSecondLast(e.target.value)} placeholder={t("profile.secondLastName")}/>    
              </Form.Item>
           </Col>

           <Col span={12}>
              <Form.Item label={t("profile.contactNumber") + ":"} name="numCont" rules={[{required: true,message: t("messageError.emptyContactNumber"),},
                {len:8, message: t("messageError.lengthContactNumber")}
              ]}>
                <Input style={{marginBottom:margin, width: 200}} onChange={(e) => setNumCont(e.target.value)} placeholder={t("profile.contactNumber")}/>   
              </Form.Item>


              <Form.Item label={t("profile.municipality") + ":"} name="municipio" rules={[{required: true,message: t("messageError.emptyMunicipality"),},]}>
                <Select style={{marginBottom:margin, width:200}} onSelect={(value) => setMunicipio(value)} placeholder={t("profile.municipality")}>
                  {dataSource.map((item, i) => (
                    <Option key={i} value={item.nommun}>{item.nommun}</Option>
                  ))}
                </Select>

              </Form.Item>

           </Col>
         </Row>

        </Flex>
    </Modal>
  )
}

export default ModalModClient