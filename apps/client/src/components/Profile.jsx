import { Modal, Tag , Descriptions, Flex, Divider} from 'antd'
import { useTranslation } from "react-i18next";
import FormItemLabel from 'antd/es/form/FormItemLabel'
import React from 'react'

const Profile = ({isOpen, setOpen}) => {
    const [t] = useTranslation("global");

    const margin = 10;
  return (
    <Modal title={t("profile.profile")} centered={true} open={isOpen} cancelText="Volver"  okButtonProps={null} onCancel={setOpen}>
        

        <Flex style={{marginBottom: margin}}>
            <Tag>CI: </Tag>
        </Flex>

        <Flex style={{marginBottom: margin}}>
            <Tag>{t("profile.name")}: </Tag>
        </Flex  >

        <Flex style={{marginBottom: margin}}>
            <Tag>{t("profile.secondName")}: </Tag>
        </Flex>

        <Flex style={{marginBottom: margin}}>  
            <Tag>{t("profile.lastName")}: </Tag>
        </Flex>

        <Flex style={{marginBottom: margin}}>
            <Tag>{t("profile.secondLastName")}: </Tag>
        </Flex>
        
        
        <Flex style={{marginBottom: margin}}>
            <Tag>{t("profile.username")}: </Tag>
            <FormItemLabel label={"hola"}/>
        </Flex>

        <Flex style={{marginBottom: margin}}>
            <Tag>{t("profile.password")}: </Tag>
        </Flex>

        <Flex style={{marginBottom: margin}}>
            <Tag>Email: </Tag>
        </Flex>

        <Flex style={{marginBottom: margin}}>
        <Tag>{t("profile.municipality")}: </Tag>
        </Flex>

        <Flex style={{marginBottom: margin}}>
            <Tag>{t("profile.age")}: </Tag>
        </Flex>
            
        <Flex style={{marginBottom: margin}}>
            <Tag>{t("profile.sex")}: </Tag>
        </Flex>

        <Flex style={{marginBottom: margin}}>
            <Tag>{t("profile.contactNumber")}: </Tag>
        </Flex>
        
    </Modal>
  )
}

export default Profile