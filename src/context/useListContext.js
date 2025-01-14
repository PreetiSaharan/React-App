import React, { createContext, useState, useContext } from "react";

const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [list, setList] = useState([]);
  return (
    <ListContext.Provider
      value={{list, setList}}
    >
      {children}
    </ListContext.Provider>
  );
};

export const useListContext = () => useContext(ListContext);