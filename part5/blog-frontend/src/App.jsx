import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [title, setTitle] = useState("");
  //const [author, setAuthor] = useState("");
  //const [url, setUrl] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => setBlogs(initialBlogs));
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handlePost = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });
  };

  const increaseLike = async (id, updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(id, updatedBlog);
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
    } catch (error) {
      setErrorMessage(`Failed to update likes for '${updatedBlog.title}'`);
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };
  //console.log(JSON.stringify(blogs));
  //handleLike("67cb8ef9912c56c417789d73");

  const removeBlog = async (id) => {
    await blogService.deleteBlog(id);
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const logout = (event) => {
    event.preventDefault();
    console.log("Logout");
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage}></Notification>
      {user === null && loginForm()}

      {user ? (
        <>
          <p>
            Hello {user.username} <button onClick={logout}>Logout</button>
          </p>
          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm createBlog={handlePost}></BlogForm>
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={increaseLike}
                handleDelete={removeBlog}
              />
            ))}
        </>
      ) : (
        <p>No blogs to display</p>
      )}
    </div>
  );
};

export default App;
