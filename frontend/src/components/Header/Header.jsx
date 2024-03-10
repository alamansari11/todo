import { useContext } from "react";
import { Link } from "react-router-dom";
import { context, server } from "../../main";
import toast from "react-hot-toast";
import axios from "axios";
import "./Header.css";
import { BiSolidBookAdd } from "react-icons/bi";


function Header() {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(context);
  const logoutHandler = async (e) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/v1/users/logout`, {
        withCredentials: true,
      });
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
      <header className="header">
        <div className="header__brand">
          <BiSolidBookAdd size={40}/>
          <h1 className="header__title madimi-one-regular">Your Todo</h1>
        </div>

        <nav className="navbar">
          <Link to={"/"} className="navbar__link">
            Home
          </Link>
          <Link to={"/profile"} className="navbar__link">
            Profile
          </Link>
          {isAuthenticated ? (
            <button
              disabled={loading}
              onClick={logoutHandler}
              className="logout_btn"
            >
              Logout
            </button>
          ) : (
            <Link to={"/login"} className="navbar__link">
              Login
            </Link>
          )}
        </nav>
      </header>
    </>
  );
}
export default Header;
