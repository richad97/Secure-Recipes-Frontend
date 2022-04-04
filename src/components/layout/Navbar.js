import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/layout/Nav.css";
import { GiChefToque } from "react-icons/gi";
import { FaGripLines } from "react-icons/fa";

function Navbar(props) {
  const { isAuth, setAuth, setDisplayLeft, setDisplayRight } = props;
  const [hamClicked, setHamClicked] = useState(false);

  return (
    <nav>
      <ul>
        <div className="auth-links-left">
          <li>
            <Link to="/" className="nav-logo">
              <GiChefToque />
            </Link>
          </li>
          {isAuth ? (
            <li className="links-not-logo">
              <Link to="/recipes">My Recipes</Link>
            </li>
          ) : null}
          {isAuth ? (
            <li className="links-not-logo">
              <Link to="/friends">My Friends</Link>
            </li>
          ) : null}
        </div>
        <div className="auth-links-right">
          {isAuth ? (
            <li>
              <Link
                onClick={() => {
                  localStorage.removeItem("token");
                  setAuth(false);
                }}
                to="/"
              >
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
