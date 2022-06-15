import { useState, useEffect } from "react";

export const Test = ({ functionTest }) => {
  const [test, setTest] = useState();
  useEffect(() => {
    const filho = "Eu sou o filho do rei.";
    setTest(filho);
  }, []);
  return <button onClick={() => functionTest(test)}>Test</button>;
};
