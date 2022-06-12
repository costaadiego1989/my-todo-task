import { createContext, useContext } from "react";

const initialState = [];

export const createTasksListContext = createContext(initialState);

export const useTasksListContext = () => {
  return useContext(createTasksListContext);
};

export const setTasksListContext = (arrayUpdated) => {
  createContext({
    updatedDate: "12/06/2022",
    tasksList: arrayUpdated,
  });
};

console.log(setTasksListContext);
