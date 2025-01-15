import React, { createContext, useState, useContext, useEffect } from "react";

const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    // Initialize the list from localStorage
    const savedList = JSON.parse(localStorage.getItem("inventoryList")) || [];
    setList(savedList);
  }, []);

  return (
    <ListContext.Provider value={{list, setList}}>
      {children}
    </ListContext.Provider>
  );
};

export const useListContext = () => useContext(ListContext);