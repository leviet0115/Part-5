import { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog, loggedUser }) => {
  const [visible, setVisible] = useState(false);

  const toggle = () => setVisible(!visible);

  const label = visible ? "hide" : "view";

  const divStyle = {
    border: "solid 1px",
    padding: "1px",
    margin: "3px 1px",
    width: "70%",
  };

  const removeBtnStyle = {
    backgroundColor: "red",
    color: "white",
  };

  const handleLike = async () => {
    const newBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    updateBlog(newBlog);
  };

  const handleRemove = async () => {
    const consent = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (consent) {
      deleteBlog(blog.id);
    }
  };

  console.log(loggedUser);

  return (
    <div style={divStyle}>
      {blog.title} {blog.author}
      <button onClick={toggle}>{label}</button>
      {visible ? (
        <div>
          <p>{blog.url}</p>
          <p>
            likes: {blog.likes}
            <button onClick={handleLike}>like</button>
          </p>
          <p>{blog.user.name}</p>
          {blog.user.username === loggedUser.username && (
            <button onClick={handleRemove} style={removeBtnStyle}>
              remove
            </button>
          )}
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Blog;
