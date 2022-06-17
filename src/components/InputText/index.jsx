import "./style.css";

export const Input = ({ type, placeholder, onChange, name, value, id, checked }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        checked={checked}
        id={id}
      />
    </>
  );
};
