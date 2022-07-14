const NewBlog = ({
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl,
  handleClick,
}) => {
  return (
    <form>
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
      <button type="sumbit" onClick={handleClick}>
        Create
      </button>
    </form>
  );
};

export default NewBlog;
