import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Header.css";
import { context } from "../main";
import { server } from "../main";
import toast from "react-hot-toast";
import axios from 'axios';

function Header() {
  const { isAuthenticated, setIsAuthenticated,loading,setLoading } = useContext(context);
  const logoutHandler = async (e) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/v1/users/logout`, {
        withCredentials: true,
      });
      console.log(data);
      toast.success(data.message);
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      console.log("catch error: " + error);
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };
  return (
    <>
      <nav className="header">
        <div>
          <h1 className="header-title">Todo App</h1>
        </div>
        <article className="navigation">
          <Link to={"/"}>Home</Link>
          <Link to={"/profile"}>Profile</Link>
          {isAuthenticated ? (
            <button disabled={loading} onClick={logoutHandler} className="btn">
              Logout
            </button>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </article>
      </nav>
    </>
  );
}
export default Header;
