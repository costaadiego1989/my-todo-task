import "./style.css";
import { AiOutlineFileAdd } from "react-icons/ai";

export const Button = ({ onClick }) => {
  return (
    <>
      <AiOutlineFileAdd size={70} className="buttonAddTask" onClick={onClick} />
    </>
  );
};
