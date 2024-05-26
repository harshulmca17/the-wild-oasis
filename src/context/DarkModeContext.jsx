import React, { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useLocalStorageState(false, "isDarkMode");

  useEffect(()=>{
    if(darkMode){
      document.documentElement.classList.add("dark-mode")
      document.documentElement.classList.remove("light-mode")
    }else{
      document.documentElement.classList.add("light-mode")
      document.documentElement.classList.remove("dark-mode")

    }
  },[darkMode])
  function toggleDarkMode() {
    setDarkMode((darkMode) => !darkMode);
  }

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}


function useDarkMode(){
    const context = useContext(DarkModeContext);

    if(context === undefined) throw new Error("Dark mode was used outsite of Dark mode provider");

    return context;
}

export {DarkModeProvider,useDarkMode}