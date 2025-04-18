import React, { createContext, useContext, useEffect, useState } from 'react'

export const GlobalContext = createContext();

const GlobalProvider = ({children}) => {
  const [row, setRow] = useState(null);
  const [user, setUser] = useState(null);
  const [client, setClient] = useState(null);
  
  const isAuthenticate = () => {
    if(sessionStorage.getItem('jwt'))
      return true;
    else return false;
  }

  const isAuthorization = (permissions) => {
    const jwt = sessionStorage.getItem('jwt');

    const [header, payload, signature] = jwt.split('.');

    const role = JSON.parse(atob(payload)).roles;
    
    return permissions.includes(role);
  }

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const clientData = localStorage.getItem('clientData');

    if(userData)
      setUser(JSON.parse(userData));

    if(clientData)
      setClient(JSON.parse(clientData));
  }, [])
  
  return (
    <GlobalContext.Provider value={{row, setRow, user, setUser, client, setClient, isAuthenticate, isAuthorization}}>
      {children}
    </GlobalContext.Provider>
  )
}
export const useRow = () => useContext(GlobalContext);
export default GlobalProvider;