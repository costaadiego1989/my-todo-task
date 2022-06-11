import "./style.css";
import { Input } from "../Input";
import { Button } from "../Button";
import { useState } from "react";

export const Header = () => {
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState(1);

  const handleClick = () => {
    const newTask = {
      id: id,
      taskName: taskName,
      date: date,
    };
    setId(id + 1);
    setTaskName("");
    setDate("");
    console.log(newTask);
    return newTask;
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
