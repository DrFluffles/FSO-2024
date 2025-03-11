import { useState } from "react";
const Blog = ({ blog, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false);
  const [buttonText, setButtonText] = useState("View");
  const [buttonVis, setButtonVis] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };
  const showDelete = { display: buttonVis ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
    setButtonText(visible ? "View" : "Hide");
    const loggedUserJson = window.localStorage.getItem("loggedBlogappUser");
    if (JSON.parse(loggedUserJson).username === blog.user.username) {
      setButtonVis(true);
    }
  };

  const increaseLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    await handleLike(blog.id, updatedBlog);
  };

  const removeBlog = async () => {
    await handleDelete(blog.id);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      Title: {blog.title}
      <button onClick={toggleVisibility}>{buttonText}</button>
      <div style={showWhenVisible}>
        Author: {blog.author} <br></br>
        Url: {blog.url} <br></br>
        Likes: {blog.likes} <button onClick={increaseLike}>Like</button>
        <br></br>
        {/*User: {blog.user.username} <br></br>*/}
        <button style={showDelete} onClick={removeBlog}>
          Remove
        </button>
      </div>
    </div>
  );
};
export default Blog;
