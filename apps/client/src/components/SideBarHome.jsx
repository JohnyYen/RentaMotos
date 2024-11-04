import {
    CarOutlined,
    DollarOutlined,
    FileAddOutlined,
    FileDoneOutlined,
    FlagOutlined,
    HomeOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import { Menu, Flex } from "antd";
  import { useTranslation } from "react-i18next";
  import "../App.css";
  import "boxicons";
import { GiSpain } from "react-icons/gi";
import { IoDocumentOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

  
  const SideBarHome = () => {
    const navigate = useNavigate();
    //const navigate = useNavigate();
    const [t,i18n] = useTranslation("global");
    const language = (value, option) => {
      switch(value){
        case 'es':
          i18n.changeLanguage("es");
          break;
        case 'en':
          i18n.changeLanguage("en");
          break;
      }
    };


    return (
      <>
        <Flex align="center" justify="center">
          <box-icon
          onClick={()=>alert()}//Pa virar a home
            name="home"
            size="1.2rem"
            color="white"
            style={{ marginTop: "1.5rem" }}
          ></box-icon>
        </Flex>
        <Menu
          theme="dark"
          className="sider-menu"
          defaultSelectedKeys={["/listadoClientes"]}
          defaultOpenKeys={["/clientes"]}
          mode="inline"
          onClick={(item) => {
            if(item.key === "faq"){
              navigate(`/${item.key}`);
            }else{
            if(item.key === "contratosCliente" || item.key === "motosCliente")
            alert('Debes estar logueado');
            if(item.key === "spanish"){
              language("es");
            }
            if(item.key === "english"){
              language("en");
            }
          }
          }}
          items={[
            {
                label: t("sideBar.myContracts"),
                icon: <FileDoneOutlined />,
                key: "contratosCliente",
            },
            {
              label: t("sideBar.motorcycleList"),
              icon: <CarOutlined />,
              key: "motosCliente",
              
            },
            {
              label: t("sideBar.traduction"),
              icon: <FlagOutlined/>,
              key: "traduccion",
              children: [
                {
                 
                  label: t("sideBar.spanish"),
                  key: "spanish",
                  value: "es",
                },
                {
                  label: t("sideBar.english"),
                  key: "english",
                  value: "en"
                },
              ]
          },
          {
            label: t("sideBar.perfil"),
            icon: <UserOutlined/>,
            key: "perfil",
        }
        ,
          {
            label: t("sideBar.FAQ"),
            icon: <IoDocumentOutline/>,
            key: "faq",
            
        }
          ]}
        ></Menu>
      </>
    );
  };

  export default SideBarHome;