import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import NewBlog from "./components/NewBlog";
import Noti from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
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

  const loginWith = async (credential) => {
    try {
      const user = await loginService.getToken(credential);
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      setLoggedUser(user);
    } catch (error) {
      setMsg({ msg: "Wrong username or password!", type: "error" });
      setTimeout(() => setMsg(null), 2000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setLoggedUser(null);
  };

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.createNewBlog(blog);
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

  const updateBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.updateBlog(blog);
      const newBlogs = blogs.map((b) => (b.id === blog.id ? updatedBlog : b));
      setBlogs(newBlogs);
    } catch (error) {
      setMsg({ msg: "Something's wrong.", type: "error" });
      setTimeout(() => setMsg(null), 2000);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id);
      const newBlogs = blogs.filter((blog) => blog.id !== id);
      setBlogs(newBlogs);
      setMsg({ msg: `Blog ${id} is deleted!`, type: "message" });
      setTimeout(() => setMsg(null), 2000);
    } catch (error) {
      setMsg({ msg: "Something's wrong.", type: "error" });
      setTimeout(() => setMsg(null), 2000);
    }
  };

  return (
    <div>
      {msg && <Noti message={msg} />}
      {!loggedUser ? (
        <Login loginWith={loginWith} />
      ) : (
        <div>
          <p>
            {loggedUser.username} logged in{" "}
            <button onClick={handleLogout}>Log out</button>
          </p>
          <Togglable label="New blog">
            <NewBlog createBlog={createBlog} />
          </Togglable>

          <div>
            <h2>blogs</h2>
            {blogs
              .sort((a, b) => a.likes - b.likes)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  updateBlog={updateBlog}
                  deleteBlog={deleteBlog}
                  loggedUser={loggedUser}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
