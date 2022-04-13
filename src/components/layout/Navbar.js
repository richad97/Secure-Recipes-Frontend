import main from "../../assets/main.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "../../styles/components/layout/Nav.css";

function Navbar(props) {
  const { isAuth, setAuth, setDisplayLeft, setDisplayRight } = props;
  const [hamClicked, setHamClicked] = useState(false);

  return (
    <nav>
      <ul className="irresponsive">
        <div className="auth-links-left">
          {isAuth ? null : (
            <li>
              <Link to="/" className="nav-logo">
                <img alt="svg" src={main} />
              </Link>
            </li>
          )}
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

        {isAuth ? (
          <div>
            <li>
              <Link to="/" className="nav-logo">
                <img alt="svg" src={main} />
              </Link>
            </li>
          </div>
        ) : null}

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

      <ul className="responsive">
        <GiHamburgerMenu />

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
      </ul>
    </nav>
  );
}

export default Navbar;
