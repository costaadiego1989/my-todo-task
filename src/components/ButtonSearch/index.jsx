import "./style.css";
import { BiSearchAlt2 } from "react-icons/bi";

export const Button = ({ onClick }) => {
  return (
    <>
      <BiSearchAlt2 size={70} className="buttonAddTask" onClick={onClick} />
    </>
  );
};
