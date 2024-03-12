// Importing necessary React components, styles, and dependencies
import { useState, useEffect } from "react";
import axios from "axios";
import { context } from "../../main";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { server } from "../../main";

// Importing the TodoItem component for displaying individual tasks
import TodoItem from "../../components/TodoItem/TodoItem";

// Importing CSS styles specific to the Home component
import "./Home.css";

// Functional component representing the home page with task management
function Home() {
  // State variables to manage user input, authentication status, loading, tasks, and refresh state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Event handler for submitting the task creation form
  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      // Making a POST request to the server to create a new task
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

      // Displaying a success toast message and updating authentication status
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);

      // Clearing the input fields after successful task creation
      setTitle("");
      setDescription("");
    } catch (error) {
      // Displaying an error toast message on task creation failure
      toast.error(error.response.data.message);

      // Updating authentication status and setting loading state to false
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  // Fetching and updating the list of tasks from the server on component mount and refresh state change
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
        // Displaying an error toast message on task retrieval failure
        toast.error(error.response.data.message);
      });
  }, [refresh]);

  // Event handler for updating the completion status of a task
  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/api/v1/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      // Displaying a success toast message and triggering a refresh
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      // Displaying an error toast message on task update failure
      toast.error(error.response.data.message);
    }
  };

  // Event handler for deleting a task
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/api/v1/task/${id}`, {
        withCredentials: true,
      });

      // Displaying a success toast message and triggering a refresh
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      // Displaying an error toast message on task deletion failure
      toast.error(error.response.data.message);
    }
  };

  // Redirecting to the login page if the user is not authenticated
  if (!isAuthenticated) return <Navigate to="/login" />;

  // Rendering the task creation form and the list of tasks
  return (
    <div className="container">
      <section>
        {/* Form for creating a new task */}
        <form onSubmit={submitHandler} className="todoform">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            placeholder="Title"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            name="description"
            placeholder="Description"
            cols="30"
            rows="6"
            required
          ></textarea>
          {/* Button for submitting the task creation form */}
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
      {/* Section for displaying the list of tasks */}
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

// Exporting the Home component as the default export of this module
export default Home;
