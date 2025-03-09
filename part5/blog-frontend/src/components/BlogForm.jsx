import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handlePost = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: 0,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handlePost}>
      <div>
        Title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={author}
          title="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url:
        <input
          type="text"
          value={url}
          test="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="Submit">Create</button>
    </form>
  );
};

export default BlogForm;
