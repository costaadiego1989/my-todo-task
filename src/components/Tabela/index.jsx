import "./style.css";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";

export const Tabela = () => {
  let initialTasks = [];

  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState(1);
  const [tasks, setTasks] = useState(initialTasks);

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
        return newTask;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="contentSearch">
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

      <div className="containerTable">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Nome da tarefa</th>
              <th scope="col">Data de realização</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              return (
                <>
                  <tr>
                    <th scope="row">{task.id}</th>
                    <td>{task.taskName}</td>
                    <td>{task.date}</td>
                    <td>
                      <div>
                        <BiEdit size={30} />
                        <RiDeleteBin5Fill size={30} />
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
