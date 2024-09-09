import { Modal, Tag , Descriptions, Flex, Divider, Col, Row} from 'antd'
import FormItemLabel from 'antd/es/form/FormItemLabel'
import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'

const Profile = ({isOpen, setOpen}) => {

    const {user, client} = useContext(GlobalContext);

    const margin = 10;
  return (
    <Modal footer={null} title={"Perfil"} centered={true} open={isOpen} cancelText="Volver"  okButtonProps={null} onCancel={setOpen}>
        
        <Row gutter={16}>
            <Col span={12}>

                <Flex style={{marginBottom: margin}}>
                    <Tag>Nombre de Usuario: </Tag>
                    <FormItemLabel label={user?.nombre_usuario}/>
                </Flex>

                <Flex style={{marginBottom: margin}}>
                    <Tag>CI: </Tag>
                    <FormItemLabel label={client?.idcliente}/>
                </Flex>

                <Flex style={{marginBottom: margin}}>
                    <Tag>Contraseña: </Tag>
                    <FormItemLabel label={user?.contrasenia}/>
                </Flex>

                <Flex style={{marginBottom: margin}}>
                    <Tag>Email: </Tag>
                    <FormItemLabel label={user?.email}/>
                </Flex>

                <Flex style={{marginBottom: margin}}>
                    <Tag>Número de Contacto: </Tag>
                    <FormItemLabel label={client?.numcont}/>
                </Flex>

                <Flex style={{marginBottom: margin}}>
                    <Tag>Nombre: </Tag>
                    <FormItemLabel label={client?.nombre}/>
                </Flex  >

                <Flex style={{marginBottom: margin}}>
                    <Tag>Segundo Nombre: </Tag>
                    <FormItemLabel label={client?.segnombre}/>
                </Flex>
                
            
            </Col>

            <Col span={12}>
                
                <Flex style={{marginBottom: margin}}>  
                    <Tag>Primer Apellido: </Tag>
                    <FormItemLabel label={client?.primapellido}/>
                </Flex>

                <Flex style={{marginBottom: margin}}>
                    <Tag>Segundo Apellido: </Tag>
                    <FormItemLabel label={client?.segapellido}/>
                </Flex>

                <Flex style={{marginBottom: margin}}>
                    <Tag>Municipio: </Tag>
                    <FormItemLabel label={client?.municipio}/>
                </Flex>

                <Flex style={{marginBottom: margin}}>
                    <Tag>Edad: </Tag>
                    <FormItemLabel label={client?.edad}/>
                </Flex>
                    
                <Flex style={{marginBottom: margin}}>
                    <Tag>Sexo: </Tag>
                    <FormItemLabel label={client?.sexo}/>
                </Flex>

            </Col>
        </Row>
        
    </Modal>
  )
}

export default Profile