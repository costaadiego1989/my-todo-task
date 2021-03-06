/* eslint-disable jsx-a11y/anchor-is-valid */
import "./style.css";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { Input } from "../InputText";
import { Button } from "../ButtonCreate";
import moment from "moment";
import "moment-timezone";
import "moment/locale/pt-br";
import Swal from "sweetalert2";
import api from "../../services/tasks.service";

moment.locale("pt-br");

export const Tabela = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [edited, setEdited] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [urlParams, setUrlParams] = useState();

  let countTasks = 1;

  const handleCreate = () => {
    const datePicker = document.querySelector("#datePicker").value;
    const currentDate = moment().format("YYYY-MM-DD");
    setTaskDate(datePicker);
    try {
      if (taskName && datePicker >= currentDate) {
        const taskData = {
          taskName: taskName,
          taskDate: taskDate,
        };
        api
          .post("task", taskData)
          .then((response) => setTasks(response))
          .catch((error) => {
            console.log(error.response);
          });
        setTaskName("");
        setTaskDate("");
        Swal.fire("Criado!", "A tarefa foi criada com sucesso.", "success");
      } else if (!taskName) {
        Swal.fire(
          "Erro!",
          "Você precisa colocar um nome e uma data na sua tarefa.",
          "error"
        );
      } else {
        Swal.fire(
          "Erro!",
          "Não é possível agendar uma tarefa no passado.",
          "error"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (taskId) => {
    setUrlParams(window.history.pushState({}, "", `/${taskId._id}`));
    Swal.fire({
      title: "Tem certeza disso?",
      text: "Você irá excluir permanente este item.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "indigo",
      confirmButtonText: "Excluir",
      cancelButtonColor: "#b92323",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const filteredTask = api
          .delete(`task/${taskId._id}`)
          .then((response) => setTasks(filteredTask))
          .catch((error) => {
            console.log(error.response);
          });
        setDeleted(!deleted);
        setUrlParams(window.history.pushState({}, "", `/`));
        Swal.fire("Deletado!", "A tarefa foi deletada com sucesso.", "success");
      } else {
        setUrlParams(window.history.pushState({}, "", `/`));
      }
    });
  };

  const handleEdit = (taskElement) => {
    setUrlParams(window.history.pushState({}, "", `/${taskElement._id}`));
    const currentDate = moment().format("YYYY-MM-DD");
    const { value: text } = Swal.fire({
      title: "Tem certeza disso?",
      text: "Você poderá alterar quantas vezes quiser.",
      icon: "warning",
      input: "text",
      inputValue: taskElement.name,
      showCancelButton: true,
      confirmButtonColor: "indigo",
      confirmButtonText: "Alterar",
      cancelButtonColor: "#b92323",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const valueInput = document.querySelector(".swal2-input").value;
        const taskData = {
          taskName: valueInput,
          taskDate: currentDate,
        };
        api
          .put(`task/${taskElement._id}`, taskData)
          .then((response) => setTasks(response))
          .catch((error) => {
            console.log(error.response);
          });
        setTaskName("");
        setTaskDate("");
        setEdited(!edited);
        setUrlParams(window.history.pushState({}, "", `/`));
        Swal.fire("Editado!", "A tarefa foi editada com sucesso.", "success");
      } else {
        setUrlParams(window.history.pushState({}, "", `/`));
        Swal.fire("Cancelado!", "Você cancelou esta operação.", "error");
      }
    });
  };

  const getInitialData = (data) => {
    setTasks(data);
  };

  const handleCheck = (e) => {
    const id = e;
    api.put("task", { id: id });
    setEdited(!edited);
  };

  useEffect(() => {
    api.get("tasks").then((response) => {
      getInitialData(response.data.sucesso);
    });
  }, [edited, deleted, taskName]);

  return (
    <>
      <div className="contentSearch">
        <div className="containerSearch">
          <Input
            type="text"
            name="taskName"
            placeholder="Digite uma tarefa..."
            value={edited === false ? taskName : null}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <Input
            type="date"
            name="taskDate"
            value={taskDate}
            id="datePicker"
            onChange={(e) => setTaskDate(e.target.value)}
          />
          <Button text="Adicionar" onClick={handleCreate} />
        </div>
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
            {tasks.length > 0
              ? tasks.map((task) => {
                  return (
                    <>
                      <tr key={task.name}>
                        <th scope="row">{countTasks++}</th>
                        <td className="taskName">
                          {task.completed === true ? (
                            <Input
                              type="checkbox"
                              value={task._id}
                              checked
                              onChange={(e) => handleCheck(e.target.value)}
                            />
                          ) : (
                            <Input
                              type="checkbox"
                              value={task._id}
                              onChange={(e) => handleCheck(e.target.value)}
                            />
                          )}
                          {task.completed === true ? (
                            <span className="taskCompleted">{task.name}</span>
                          ) : (
                            task.name
                          )}
                        </td>
                        <td>{moment(task.date).format("LL")}</td>
                        <td>
                          <div className="actionButtons">
                            <a
                              className="actionButton"
                              role="button"
                              id={task}
                              onClick={() => handleEdit(task)}
                              style={{ cursor: "pointer" }}
                            >
                              <BiEdit size={30} color="#FFCF4D" />
                            </a>
                            <a
                              className="actionButton"
                              role="button"
                              id={task}
                              onClick={() => handleDelete(task)}
                              style={{ cursor: "pointer" }}
                            >
                              <RiDeleteBin5Fill size={30} color="#b92323" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
};
