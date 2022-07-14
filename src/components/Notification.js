const Noti = ({ message }) => {
  const { msg, type } = message;
  const color = type === "error" ? "red" : "green";
  const notiStyle = {
    color: color,
    borderColor: color,
    borderStyle: "solid",
    width: "fit-content",
    padding: 5,
  };

  return <p style={notiStyle}>{msg}</p>;
};

export default Noti;
