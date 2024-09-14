import React, { createContext, useContext, useEffect, useState } from 'react'

export const GlobalContext = createContext();

const GlobalProvider = ({children}) => {
  const [row, setRow] = useState(null);
  const [user, setUser] = useState(null);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const clientData = localStorage.getItem('clientData');

    if(userData)
      setUser(JSON.parse(userData));

    if(clientData)
      setClient(JSON.parse(clientData));
  }, [])
  
  return (
    <GlobalContext.Provider value={{row, setRow, user, setUser, client, setClient}}>
      {children}
    </GlobalContext.Provider>
  )
}
export const useRow = () => useContext(GlobalContext);
export default GlobalProvider;