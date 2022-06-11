import "./style.css";
import { Input } from "../Input";
import { Button } from "../Button";

export const Header = () => {
  return (
    <header className="containerHeader">
      <div className="contentHeader">
        <h2>Todo's Tasks</h2>
        <p>Seu aplicativo de gestão de tarefas.</p>
        <div className="containerSearch">
          <Input type="text" name="tasks" placeholder="Digite uma tarefa..." />
          <Input type="date" name="DataTasks" />
          <Button text="Adicionar" />
        </div>
      </div>
    </header>
  );
};
