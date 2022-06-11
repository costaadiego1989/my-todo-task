import "./style.css";

export const Input = ({ type, placeholder, onChange, name, value }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    </>
  );
};
