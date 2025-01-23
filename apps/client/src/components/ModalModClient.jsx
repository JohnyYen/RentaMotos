import { Col, Flex, Form, Input, InputNumber, message, Modal, Row, Select } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { GlobalContext } from '../context/GlobalContext';
import { useTranslation } from 'react-i18next';

const response = await axios.get('http://localhost:3000/api/client/mun');
let dataSourceMun = [];
if(response.status === 200)
  dataSourceMun = response.data;

const ModalModClient = ({isOpen, setOpen, dataSource, setDataSource}) => {

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

    useEffect(() => {
      // Asegurarnos de que los valores del formulario se actualicen cuando `row` cambie.
      if (row) {
        setName(row.nombre || "");
        setSecondName(row.segNombre || "");
        setLastName(row.primApellido || "");
        setSecondLast(row.segApellido || "");
        setEdad(row.edad || 0);
        setMunicipio(row.municipio || "");
        setNumCont(row.numCont || "");
      }
    }, [row]); // Esto se ejecuta cada vez que `row` cambie.

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

      const jwt = JSON.parse(sessionStorage.getItem('jwt'))
      const res = await axios.patch(`http://localhost:3000/api/client/${row?.ci}`, client, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });

      if(res.status === 200){
        
        const index = dataSource.findIndex(
          (item) => item.ci === client.idCliente
        );
        dataSource[index] = { ...dataSource[index], ...client };

        setDataSource([...dataSource]);
      }

      message.success('Creado con exito');
      setOpen(false);
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
           <Col span={20}>
              <Form.Item label={t("profile.name") + ":"} name="name" >
                <Input value={name} style={{marginBottom:margin, width: 200}} onChange={(e) => setName(e.target.value)} placeholder={t("profile.name")} defaultValue={row?.nombre}/>
              </Form.Item>

              {/* <Form.Item label={t("profile.contactNumber") + ":"} name="numCont" rules={[{required: true,message: t("messageError.emptyContactNumber"),},
                {len:8, message: t("messageError.lengthContactNumber")}
              ]}>
                <Input style={{marginBottom:margin, width: 200}} onChange={(e) => setNumCont(e.target.value)} placeholder={t("profile.contactNumber")}/>   
              </Form.Item> */}


              <Form.Item label={t("profile.municipality") + ":"} name="municipio" >
                <Select value={Municipio} style={{marginBottom:margin, width:200}} onSelect={(value) => setMunicipio(value)} placeholder={t("profile.municipality")} defaultValue={row?.municipio}>
                  {dataSourceMun.map((item, i) => (
                    <Option key={i} value={item.nom_mun}>{item.nom_mun}</Option>
                  ))}
                </Select>

              </Form.Item>

              {/* <Form.Item label={t("profile.middleName") + ":"} name="secondName" rules={[{min: 4,message: t("messageError.minCharMiddleName"),},
                {max:20,message: t("messageError.maxCharMiddleName"),}
              ]}>
                <Input style={{marginBottom:margin, width: 200}} onChange={(e) => setSecondName(e.target.value)} placeholder={t("profile.lastName")} defaultValue={row?.segNombre}/>  
              </Form.Item>


              <Form.Item label={t("profile.lastName") + ":"} name="primApellido" rules={[{required: true,message: t("messageError.emptyLastName"),},
                {min:4, message: t("messageError.minCharLastName")},
                {max:25, message: t("messageError.maxCharLastName")},
              ]}>
              <Input style={{marginBottom:margin, width: 200}} onChange={(e) => setLastName(e.target.value)} placeholder={t("profile.lastName")} />        
              </Form.Item>


              <Form.Item label={t("profile.secondLastName") + ":"} name="segApellido" rules={[{min: 4,message: t("messageError.minCharLastName"),},
                {max:25 ,message: t("messageError.maxCharLastName"),},
              ]}>
                <Input style={{marginBottom:margin, width: 200}} onChange={(e) => setSecondLast(e.target.value)} placeholder={t("profile.secondLastName")}/>    
              </Form.Item> */}
           </Col>
         </Row>

        </Flex>
    </Modal>
  )
}

export default ModalModClient