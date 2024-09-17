import { Checkbox, Col, DatePicker, Flex, Form, Input, InputNumber, message, Modal, Row, Select, Tag, Typography } from 'antd'
import { Option } from 'antd/es/mentions';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, UserOutlined } from '@ant-design/icons';
import { LuBike } from 'react-icons/lu';


const response = await axios.get('http://localhost:3000/api/formaPago')
let dataSource = [];

if(response.status === 200)
  dataSource = response.data;

const ModalModContract = ({isOpen, setOpen}) => {

    const [form] = Form.useForm();
    const {row} = useContext(GlobalContext);
    const [ci, setCi] = useState("");
    const [Matricula, setMatricula] = useState("");
    const [formaPago, setFormaPago] = useState("");
    const r = row ? row['seguro adicional'] == '✔' : false;
    const [seguro, setSeguro] = useState(r)
    //console.log(a);
    const [diasProrroga, setDiasProrroga] = useState(0);
    const [date, setDate] = useState('');
    const [t] = useTranslation("global");

    const margin = 0;

    const handlePetition = async () =>{
      const contract = {
        idCliente:row?.nombre,
        matricula:row?.matricula,
        beginDate:row ? row['fecha de inicio'] : null,
        endDate: date,
        firmaDate: '2024-03-04',
        formaPago: formaPago,
        seguro: seguro,
        diasProrroga: diasProrroga
      }

      if(date && formaPago && seguro && diasProrroga){
        const res = await axios.patch(`http://localhost:3000/api/contract/${row?.matricula}`, contract);

        if(res.status === 500){
          message.info('Se ha modificado con exito');
        }
        else
          window.location.reload();
      }
    }
  return (
    <Modal okButtonProps={{htmlType:'submit'}} afterClose={() => form.resetFields()}  afterOpenChange={() => setSeguro(seguro)} destroyOnClose={true} title={t("modal.modifyContract")} open={isOpen} onOk={handlePetition} onCancel={setOpen}  onClose={setOpen}
     modalRender={(dom) => (
      <Form  form={form} labelCol={{span: 16}}  wrapperCol={{span: 24}} autoComplete="off" initialValues={{remember: false,}} layout='vertical'>
          {dom}
      </Form>
  )}
      >
        <Flex vertical={true}>
          <Row gutter={24}>
            <Col span={12}>
                <Tag icon={<UserOutlined/>} style={{margin:15, width:150, height:30}}><Typography.Text>{row?.nombre}</Typography.Text></Tag>

                <Tag style={{margin:15, width:150,height:30}}><Typography.Text>{row?.matricula}</Typography.Text></Tag>

                <Form.Item label={t("modal.methodPayment") + ":"} name="formaPago" rules={[{required: true,message: t("messageError.emptyMethodPayment"),},]}>
                <Select style={{marginBottom:margin}} onSelect={(e) => setFormaPago(e)} placeholder={row ? row['forma de pago'] : t("modal.methodPayment")}>
                    {dataSource.map((item, i) => (
                      <Select.Option key={i} value={item.formapago}>{item.formapago}</Select.Option>
                    ))}
                </Select>
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item name="seguro" rules={[]}> 
                  <Checkbox defaultChecked={seguro} title={t("modal.insurance") + ":"} style={{marginBottom:margin}} onChange={(e) => setSeguro(e.target.checked)}>{t("modal.methodPayment") + ":"}</Checkbox>
                
                </Form.Item>

              <Form.Item label={t("modal.extensionDays") + ":"} name="diasProrroga" rules={[{required: true,message: t("messageError.emptyExtensionDays"),},
              ]}>
                <InputNumber min={row?.prorroga} style={{marginBottom:margin, width:150}} onChange={(e) => setDiasProrroga(e)} placeholder={row ? row['prorroga'] : t("modal.methodPayment")}/>
                
              </Form.Item>

              <Form.Item label='Fecha de Fin:' name="dateEnd" rules={[{required: true,message: 'Introduce la fecha de Fin!',},
              ]}>
                <DatePicker placement='bottomLeft' minDate={new Date(row?.fechaFin)} format={'DD/MM/YYYY'} placeholder='Fecha Fin' style={{marginBottom:margin}} onChange={(date, dateString) => setDate(dateString)}/>
              </Form.Item>
            </Col>
          </Row>

         


        </Flex>


    </Modal>
  )
}

export default ModalModContract