import { useState } from "react";
import { server } from "../../main";
import axios from "axios";
import { context } from "../../main";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import TodoItem from "../../components/TodoItem/TodoItem";
import "./Home.css";

function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/api/v1/task/newTask`,
        {
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
      setTitle("");
      setDescription("");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };
  useEffect(() => {
    axios
      .get(`${server}/api/v1/task/all`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.tasks);
        setTasks(res.data.tasks);
        setRefresh((prev) => !prev);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [refresh]);
  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/api/v1/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/api/v1/task/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  if (!isAuthenticated) return <Navigate to="/login" />;
  return (
    <div className="container">
      <section>
        <form onSubmit={submitHandler} className="todoform">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            placeholder="title"
            required
          />
          {/* <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            name="description"
            placeholder="description"
            required
          /> */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            name="description"
            placeholder="description"
            cols="30"
            rows="6"
            required
          ></textarea>
          <button disabled={loading} type="submit">
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>
            <span className="text">Add Task</span>
          </button>
        </form>
      </section>
      <section className="todosContainer">
        {tasks.map((i) => (
          <TodoItem
            className="todoitem"
            title={i.title}
            description={i.description}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id}
          />
        ))}
      </section>
    </div>
  );
}

export default Home;
