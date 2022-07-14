const Login = ({
  username,
  setUsername,
  password,
  setPassword,
  handleclick,
}) => {
  return (
    <form>
      <p>
        username:{" "}
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </p>
      <p>
        password:{" "}
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </p>
      <button type="submit" onClick={handleclick}>
        Log in
      </button>
    </form>
  );
};

export default Login;
