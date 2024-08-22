import { CarOutlined, DollarOutlined, FileDoneOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const SideBar = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Menu className="container-sideBar"
            defaultSelectedKeys={['/listadoClientes']}
            defaultOpenKeys={['/clientes']}
            mode="inline"
            onClick={(item) => {
                navigate(item.key);
            }} items={[
                {
                    label: 'Clientes',
                    icon: <UserOutlined/>,
                    key: '/clientes',
                    children: [
                        {
                            label: 'Listado Clientes',
                            key: '/listadoClientes'
                        },
                        {
                            label: 'Incumplidores',
                            key: '/incumplidoresClientes'
                        }                     
                    ]
                },
                {
                    label: 'Motos',
                    icon: <CarOutlined/>,
                    key: '/motos',
                    children: [
                        {
                            label: 'Listado Motos',
                            key: '/listadoMoto'
                        },
                        {
                            label: 'Situacion Motos',
                            key: '/situacionMotos'
                        }                        
                    ]
                },
                {
                    label: 'Contratos',
                    icon: <FileDoneOutlined/>,
                    key: '/contratos',
                    children: [
                        {
                            label: 'Listado Contratos',
                            key: '/listadoContratos'
                        },
                        {
                            label: 'Por marca y modelo',
                            key: '/contratoMarcaModelo'
                        },
                        {
                            label: 'Por municipio',
                            key: '/contratoMunicipio'
                        }                                                
                    ]
                },
                {
                    label: 'Ingresos del año',
                    icon: <DollarOutlined />,
                    key: '/ingresosAño'
                }
            ]}>

            </Menu>
        </div>
    );
};

export default SideBar;