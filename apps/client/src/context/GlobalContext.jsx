import React, { createContext, useContext, useState } from 'react'

export const GlobalContext = createContext();

const GlobalProvider = ({children}) => {
  const [row, setRow] = useState(null);
  const [user, setUser] = useState(null);
  return (
    <GlobalContext.Provider value={{row, setRow, user, setUser}}>
      {children}
    </GlobalContext.Provider>
  )
}
export const useRow = () => useContext(GlobalContext);
export default GlobalProvider;