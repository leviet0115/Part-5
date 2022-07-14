import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import NewBlog from "./components/NewBlog";
import Noti from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedUser, setLoggedUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setLoggedUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.getToken({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      blogService.setToken(user.token);
      setLoggedUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setMsg({ msg: "Wrong username or password!", type: "error" });
      setTimeout(() => setMsg(null), 2000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setLoggedUser(null);
  };

  const handleNewBlog = async (e) => {
    try {
      e.preventDefault();
      const newBlog = await blogService.createNewBlog({ author, title, url });
      setMsg({
        msg: `A new blog is added by ${loggedUser.username}`,
        type: "message",
      });
      setTimeout(() => setMsg(null), 2000);
      const updatedBlogs = blogs.concat(newBlog);
      setBlogs(updatedBlogs);
    } catch (error) {
      setMsg({ msg: "Something's wrong with the fields.", type: "error" });
      setTimeout(() => setMsg(null), 2000);
    }
  };

  if (loggedUser === null) {
    return (
      <div>
        <h2>Log in to the application</h2>
        <Login
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
          handleclick={handleLogin}
        />
        {msg && <Noti message={msg} />}
      </div>
    );
  }

  return (
    <div>
      <p>
        {loggedUser.username} logged in{" "}
        <button onClick={handleLogout}>Log out</button>
      </p>
      <div>
        <h2>create a new blog</h2>
        <NewBlog
          title={title}
          author={author}
          url={url}
          setAuthor={setAuthor}
          setTitle={setTitle}
          setUrl={setUrl}
          handleClick={handleNewBlog}
        />
      </div>
      <div>
        <h2>blogs</h2>

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
      {msg && <Noti message={msg} />}
    </div>
  );
};

export default App;
