import {
    CarOutlined,
    DollarOutlined,
    FileAddOutlined,
    FileDoneOutlined,
    FlagOutlined,
    HomeOutlined,
    SearchOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import { Menu, Flex, message, Button } from "antd";
  import { useTranslation } from "react-i18next";
  import "../App.css";
  import "boxicons";
import { GiSpain } from "react-icons/gi";
import { IoDocumentOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";



  
  const SideBarHome = () => {
    const [messageApi, contextHolder] = message.useMessage();
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
       {contextHolder}
        <Flex align="center" justify="center">
          <box-icon
          onClick={()=>{
            navigate(`/home`)
          }}//Pa virar a home
            name="home"
            size="2.5rem"
            color="white"
            style={{ marginTop: "1.5rem", cursor: "pointer"}}
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
              navigate(`/home/${item.key}`);
            }else{
              if(sessionStorage.getItem('jwt') && item.key === "contratosCliente" || sessionStorage.getItem('jwt') && item.key === "motosCliente" || sessionStorage.getItem('jwt') && item.key === "perfil"){
                navigate(`/home/${item.key}`)
              }else{if(item.key === "contratosCliente" || item.key === "motosCliente" || item.key === "perfil"){
             
              messageApi.open({
                onClick:()=>{ navigate('/loguin');},
                type: 'warning',
                content: (
                  <h3>
                    {t("sideBar.loginWarning")} 
                    <h4>{t("sideBar.loginPrompt")}</h4>
                  </h3>
                )
              }); 
            
             
            }else{
              if(item.key === "spanish"){
              language("es");
            }
            if(item.key === "english"){
              language("en");
            }}
            }
            
          }
          }}
          items={[
            {
            label: t("sideBar.profile"),
            icon: <UserOutlined/>,
            key: "perfil",
        }
        ,
            {
                label: t("sideBar.myContracts"),
                icon: <FileDoneOutlined />,
                key: "contratosCliente",
            },
            {
              label: t("sideBar.motorcycleList"),
              icon: <SearchOutlined/>,
              key: "motosCliente",
              
            },
            
          
          {
            label: t("sideBar.FAQ"),
            icon: <IoDocumentOutline/>,
            key: "faq",
            
        },{
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
          ]}
        ></Menu>
      </>
    );
  };

  export default SideBarHome;