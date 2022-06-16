import { createContext, useContext } from "react";

export const createTasksContext = createContext();

export const useTasksContext = () => {
  return useContext(createTasksContext);
};
