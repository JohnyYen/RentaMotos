import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

function ProtectedRoutes({children}) {

    const {isAuthenticate} = useContext(GlobalContext);

    if (!isAuthenticate()) {
        return <Navigate to="/home" replace />;
      }
    
      
      return children;
}

export default ProtectedRoutes