import { useState } from "react";

const Login = ({ loginWith }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    loginWith({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2>Log in to the application</h2>
      <form onSubmit={handleSubmit}>
        <p>
          username:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </p>
        <p>
          password:{" "}
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </p>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
