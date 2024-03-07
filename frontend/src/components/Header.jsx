import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import "./Header.css";

function Header() {
  return (
    <>
        <nav className="header">
        <div>
            <h1 className="header-title">Todo App</h1>
        </div>
        <article className='navigation'>
            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>
            <Link to={"/login"}>Login</Link>
        </article>
    </nav>
    </>
  );
  }
export default Header;