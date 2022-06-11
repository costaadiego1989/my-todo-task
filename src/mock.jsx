import { createContext, useContext } from "react";

export const tasksListContext = createContext();

export const UseTasksListContext = () => {
    return useContext(tasksListContext);
}