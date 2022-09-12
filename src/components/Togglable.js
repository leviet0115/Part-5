import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    setVisible(!visible);
  };

  if (visible === true) {
    return (
      <div>
        {props.children}
        <button onClick={toggle}>Cancel</button>
      </div>
    );
  }

  return <button onClick={toggle}>{props.label}</button>;
};

export default Togglable;
