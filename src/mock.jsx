import { createContext, useContext } from "react";

const initialState = [];

export const createTasksListContext = createContext(initialState);

export const useTasksListContext = () => {
    return useContext(createTasksListContext);
}