import { useTranslation } from "react-i18next";
import { Modal, Tag , Descriptions, Flex, Divider, Col, Row} from 'antd'
import FormItemLabel from 'antd/es/form/FormItemLabel'
import React, { useContext } from 'react'
import{ Avatar } from "antd"
import { GlobalContext } from '../../../context/GlobalContext'
import { Content } from "antd/es/layout/layout";

const Profile = ({isOpen, setOpen}) => {
    const [t] = useTranslation("global");

    const {user, client} = useContext(GlobalContext);
    console.log(client);

    const margin = 12;
  return (
    <Content>
       <Flex style={{marginBottom:50}}justify="center"><Avatar  size={200}></Avatar></Flex> 
        
    <Flex justify="space-around" className="perfilInfo" style={{}}>
       
        
        
        
            
            
        <Flex vertical wrap > <Flex style={{marginBottom: margin}}>
                    <Tag>{t("profile.username")}: </Tag>
                    <FormItemLabel  label={user?.nombre_usuario}/>
                </Flex>

                <Flex style={{marginBottom: margin}}>
                    <Tag>CI: </Tag>
                    <FormItemLabel label={client?.idcliente}/>
                </Flex>

                <Flex style={{marginBottom: margin}}>
                    <Tag>{t("profile.password")}: </Tag>
                    <FormItemLabel label={user?.contrasenia}/>
                </Flex>

                <Flex style={{marginBottom: margin}}>
                    <Tag>{t("profile.email")}: </Tag>
                    <FormItemLabel label={user?.email}/>
                </Flex>

                <Flex style={{marginBottom: margin}}>
                    <Tag>{t("profile.contactNumber")}: </Tag>
                    <FormItemLabel label={client?.numcont}/>
                </Flex>

                <Flex style={{marginBottom: margin}}>
                    <Tag>{t("profile.name")}: </Tag>
                    <FormItemLabel label={client?.nombre}/>
                </Flex  >

                <Flex style={{marginBottom: margin}}>
                    <Tag>{t("profile.middleName")}: </Tag>
                    <FormItemLabel label={client?.segnombre}/>
                </Flex>
                </Flex>
               
            
            

           <Flex wrap vertical="true"><Flex style={{marginBottom: margin}}>  
                    <Tag>{t("profile.lastName")}: </Tag>
                    <FormItemLabel label={client?.primapellido}/>
                </Flex>

                <Flex style={{marginBottom: margin}}>
                    <Tag>{t("profile.secondLastName")}: </Tag>
                    <FormItemLabel label={client?.segapellido}/>
                </Flex>

                <Flex style={{marginBottom: margin}}>
                    <Tag>{t("profile.municipality")}: </Tag>
                    <FormItemLabel label={client?.municipio}/>
                </Flex>

                <Flex style={{marginBottom: margin}}>
                    <Tag>{t("profile.age")}: </Tag>
                    <FormItemLabel label={client?.edad}/>
                </Flex>
                    
                <Flex style={{marginBottom: margin}}>
                    <Tag>{t("profile.sex")}: </Tag>
                    <FormItemLabel label={client?.sexo}/>
                </Flex>
</Flex>
                
                
            
       
        
    </Flex></Content>
  )
}

export default Profile;