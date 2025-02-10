
import {createContext, useEffect, useState } from "react"

export const authenticateObj = createContext();

// eslint-disable-next-line react/prop-types
export default function Authentication({children}) {
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (localStorage.getItem('tkn')!==null) {
      setToken(localStorage.getItem('tkn'));
   }
  },[])
  return (
    <authenticateObj.Provider value={{
      token,
      setToken,
    }}>
      {children}
    </authenticateObj.Provider>
  )
}

