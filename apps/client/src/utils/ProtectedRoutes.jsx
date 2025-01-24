import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import { message } from 'antd';
import UnauthorizedPage from '../components/UnauthorizedPage ';

function ProtectedRoutes({permissions,children}) {

    const {isAuthenticate, isAuthorization} = useContext(GlobalContext);

    if (!isAuthenticate()) {
        return <Navigate to="/home" replace />;
      }
    
      console.log("Permisos: ",!isAuthorization(permissions));
      if(!isAuthorization(permissions))
        return <Navigate to="/unauthorized" replace />;


      return children;
}

export default ProtectedRoutes