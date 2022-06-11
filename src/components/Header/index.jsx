import "./style.css";
import { Input } from "../Input";
import { Button } from "../Button";
import { useState } from "react";
import { UseTasksListContext } from "../../mock";

export const Header = () => {
  let initialTasks = [];

  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState(1);
  const [tasks, setTasks] = useState(initialTasks);

  const globalTasksList = UseTasksListContext(tasks);

  const handleClick = () => {
    try {
      if (taskName && date) {
        const newTask = {
          id: id,
          taskName: taskName,
          date: date,
        };
        setTaskName("");
        setDate("");
        setId(id + 1);
        const newList = tasks.concat(newTask);
        setTasks(newList);
        console.log(tasks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="containerHeader">
      <div className="contentHeader">
        <h2>Todo's Tasks</h2>
        <p>Seu aplicativo de gestão de tarefas.</p>
        <div className="containerSearch">
          <Input
            type="text"
            name="tasks"
            placeholder="Digite uma tarefa..."
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <Input
            type="date"
            name="DataTasks"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Button text="Adicionar" onClick={handleClick} />
        </div>
      </div>
    </header>
  );
};
