import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/layout/Nav.css";
import { GiChefToque } from "react-icons/gi";

function Navbar(props) {
  const { isAuth, setAuth } = props;
  return (
    <nav>
      <ul>
        <div className="auth-links-left">
          <li>
            <Link to="/">
              <span className="nav-logo">
                <GiChefToque />
              </span>
            </Link>
          </li>
          <li className="links-not-logo">
            {isAuth ? <Link to="/recipes">Recipes</Link> : null}
          </li>
          <li className="links-not-logo">
            {isAuth ? <Link to="/friends">Friends</Link> : null}
          </li>
        </div>
        <li className="auth-links-right">
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
