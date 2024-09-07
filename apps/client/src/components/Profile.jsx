import { Modal, Tag , Descriptions, Flex, Divider, Col, Row} from 'antd'
import FormItemLabel from 'antd/es/form/FormItemLabel'
import React from 'react'

const Profile = ({isOpen, setOpen}) => {

    const margin = 10;
  return (
    <Modal footer={null} title={"Perfil"} centered={true} open={isOpen} cancelText="Volver"  okButtonProps={null} onCancel={setOpen}>
        
        <Row gutter={16}>
            <Col span={12}>

                <Flex style={{marginBottom: margin}}>
                    <Tag>Nombre de Usuario: </Tag>
                    <FormItemLabel label={"hola"}/>
                </Flex>

                <Flex style={{marginBottom: margin}}>
                    <Tag>CI: </Tag>
                </Flex>

                <Flex style={{marginBottom: margin}}>
                    <Tag>Contraseña: </Tag>
                </Flex>

                <Flex style={{marginBottom: margin}}>
                    <Tag>Email: </Tag>
                </Flex>

                <Flex style={{marginBottom: margin}}>
                    <Tag>Número de Contacto: </Tag>
                </Flex>

                <Flex style={{marginBottom: margin}}>
                    <Tag>Nombre: </Tag>
                </Flex  >

                <Flex style={{marginBottom: margin}}>
                    <Tag>Segundo Nombre: </Tag>
                </Flex>
                
            
            </Col>

            <Col span={12}>
                
                <Flex style={{marginBottom: margin}}>  
                    <Tag>Primer Apellido: </Tag>
                </Flex>

                <Flex style={{marginBottom: margin}}>
                    <Tag>Segundo Apellido: </Tag>
                </Flex>

                <Flex style={{marginBottom: margin}}>
                    <Tag>Municipio: </Tag>
                </Flex>

                <Flex style={{marginBottom: margin}}>
                    <Tag>Edad: </Tag>
                </Flex>
                    
                <Flex style={{marginBottom: margin}}>
                    <Tag>Sexo: </Tag>
                </Flex>

            </Col>
        </Row>
        
    </Modal>
  )
}

export default Profile