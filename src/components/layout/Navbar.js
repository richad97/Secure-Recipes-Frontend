import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/layout/Nav.css";

function Navbar(props) {
  const { isAuth, setAuth } = props;
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
          {isAuth ? <Link to="/recipes">Recipes</Link> : null}
        </li>
        <li>
          {isAuth ? (
            <Link
              onClick={() => {
                localStorage.removeItem("token");
                setAuth(false);
              }}
              to="/"
            >
              Logout
            </Link>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
