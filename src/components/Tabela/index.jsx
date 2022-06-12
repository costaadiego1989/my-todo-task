/* eslint-disable jsx-a11y/anchor-is-valid */
import "./style.css";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useState } from "react";
import { Input } from "../InputText";
import { Button } from "../Button";
import moment from "moment";
import "moment-timezone";
import "moment/locale/pt-br";
import Swal from "sweetalert2";

moment.locale("pt-br");

export const Tabela = () => {
  let initialTasks = [];
  let url = window.location.href;

  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState(1);
  const [tasks, setTasks] = useState(initialTasks);
  const [error, setError] = useState();
  const [edited, setEdited] = useState(false);

  const handleClick = () => {
    const datePicker = document.querySelector("#datePicker").value;
    const currentDate = moment().format("YYYY-MM-DD");
    try {
      if (taskName && datePicker >= currentDate) {
        const newTask = {
          id: id,
          taskName: taskName,
          date: date,
        };
        setTaskName("");
        setDate("");
        setId(id + 1);
        setError();
        const newList = tasks.concat(newTask);
        setTasks(newList);
        return newTask;
      } else {
        setError("Não é possível adicionar uma data passada.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (taskId) => {
    Swal.fire({
      title: "Tem certeza disso?",
      text: "Você irá excluir permanente este item.",
      icon: "delete",
      showCancelButton: true,
      confirmButtonColor: "indigo",
      confirmButtonText: "Excluir",
      cancelButtonColor: "#b92323",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deletado!", "A tarefa foi deletada com sucesso.", "success");
        const filteredTask = tasks.filter((task) => task.id !== taskId);
        setTasks(filteredTask);
        setId(1);
      }
    });
  };

  const handleEdit = (taskElement) => {
    console.log(url + taskElement.id);
    const { value: text } = Swal.fire({
      title: "Tem certeza disso?",
      text: "Você poderá alterar quantas vezes quiser.",
      icon: "warning",
      input: "text",
      inputValue: taskElement.taskName,
      showCancelButton: true,
      confirmButtonColor: "indigo",
      confirmButtonText: "Alterar",
      cancelButtonColor: "#b92323",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const takeInputSwal = document.querySelector(".swal2-input").value;
        const filteredTasks = tasks.filter(
          (task) => task.id === taskElement.id
        );
        if (filteredTasks && takeInputSwal !== "") {
          setTaskName((filteredTasks[0].taskName = takeInputSwal));
          setEdited(true);
          Swal.fire("Editado!", "A tarefa foi editada com sucesso.", "success");
        } else {
          Swal.fire(
            "Cancelado!",
            "Você precisa escrever alguma coisa.",
            "error"
          );
        }
      }
    });
  };

  return (
    <>
      <div className="contentSearch">
        <div className="containerSearch">
          <Input
            type="text"
            name="tasks"
            placeholder="Digite uma tarefa..."
            value={edited === false ? taskName : null}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <Input
            type="date"
            name="DataTasks"
            value={date}
            id="datePicker"
            onChange={(e) => setDate(e.target.value)}
          />
          <Button text="Adicionar" onClick={handleClick} />
        </div>
        <span style={{ marginTop: "0.75rem", color: "red" }}>
          {error ?? error}
        </span>
      </div>

      <div className="containerTable">
        <table className="table table-striped">
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
                  <tr key={task.id}>
                    <th scope="row">{task.id}</th>
                    <td>{task.taskName}</td>
                    <td>{moment(task.date).format("LL")}</td>
                    <td>
                      <div className="actionButtons">
                        <a
                          role="button"
                          id={task}
                          onClick={() => handleEdit(task)}
                          style={{ cursor: "pointer" }}
                        >
                          <BiEdit size={30} color="#FFCF4D" />
                        </a>
                        <a
                          role="button"
                          id={task.id}
                          onClick={() => handleDelete(task.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <RiDeleteBin5Fill size={30} color="#b92323" />
                        </a>
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
