import { useState } from "react";

const NewBlog = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create a new blog</h2>
      <form onSubmit={handleSubmit}>
        <p>
          title:{" "}
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </p>
        <p>
          author:{" "}
          <input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </p>
        <p>
          url: <input value={url} onChange={(e) => setUrl(e.target.value)} />
        </p>
        <button type="sumbit">Save</button>
      </form>
    </div>
  );
};

export default NewBlog;
