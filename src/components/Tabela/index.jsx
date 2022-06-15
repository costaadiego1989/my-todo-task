/* eslint-disable jsx-a11y/anchor-is-valid */
import "./style.css";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { Input } from "../InputText";
import { Button } from "../Button";
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
  const [error, setError] = useState();
  const [edited, setEdited] = useState(false);
  const [urlParams, setUrlParams] = useState();

  const handleClick = () => {
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
        setError();
      } else {
        setError("Não é possível adicionar uma data passada.");
        const time = setTimeout(() => {
          setError();
          return time;
        }, 2000);
        clearTimeout(time);
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
        Swal.fire("Deletado!", "A tarefa foi deletada com sucesso.", "success");
        const filteredTask = api
          .delete(`task/${taskId._id}`)
          .then((response) => setTasks(filteredTask))
          .catch((error) => {
            console.log(error.response);
          });
        setUrlParams();
      } else {
        setUrlParams();
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
        setError();
        Swal.fire("Editado!", "A tarefa foi editada com sucesso.", "success");
      } else {
        Swal.fire("Cancelado!", "Você cancelou esta operação.", "error");
      }
    });
  };

  const setInitialDate = (data) => {
    setTasks(data);
  }

  useEffect(() => {
    api.get("tasks").then((response) => {setInitialDate(response.data.sucesso)});
  }, [edited]);

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
          <Button text="Adicionar" onClick={handleClick} />
          {/* <Test functionTest={functionTest} /> */}
        </div>
        <span style={{ marginTop: "0.75rem", color: "red" }}>
          {error ?? error}
          {/* {test ?? test} */}
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
            {tasks.length > 0
              ? tasks.map((task) => {
                  return (
                    <>
                      <tr key={tasks.length}>
                        <th scope="row">{tasks.length}</th>
                        <td>{task.name}</td>
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
