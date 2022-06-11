import "./style.css";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";

export const Tabela = () => {
  return (
    <div className="containerTable">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#ID</th>
            <th scope="col">Nome da tarefa</th>
            <th scope="col">Data</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Pagar a internet para poder trabalhar.</td>
            <td>20/06/2022</td>
            <td>
              <div>
                <BiEdit size={30} />
                <RiDeleteBin5Fill size={30} />
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Pagar a internet para poder trabalhar.</td>
            <td>20/06/2022</td>
            <td>
              <div>
                <BiEdit size={30} />
                <RiDeleteBin5Fill size={30} />
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Pagar a internet para poder trabalhar.</td>
            <td>20/06/2022</td>
            <td>
              <div>
                <BiEdit size={30} />
                <RiDeleteBin5Fill size={30} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      ;
    </div>
  );
};
