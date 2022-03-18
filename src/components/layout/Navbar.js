import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/layout/Nav.css";
import { GiChefToque } from "react-icons/gi";
import { FaGripLines } from "react-icons/fa";

function Navbar(props) {
  const { isAuth, setAuth, setDisplayLeft, setDisplayRight } = props;
  const [hamClicked, setHamClicked] = useState(false);

  return (
    <>
      <nav className="nav-unresponsive">
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
              {isAuth ? <Link to="/recipes">My Recipes</Link> : null}
            </li>
            <li className="links-not-logo">
              {isAuth ? <Link to="/friends">My Friends</Link> : null}
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
      <nav className="nav-responsive">
        <ul>
          <div className="nav-responsive-mainr">
            <li className="ham-cont">
              <FaGripLines
                className="nav-resp-i"
                onClick={() => {
                  setHamClicked(!hamClicked);
                }}
              />
            </li>
            <li>
              <Link to="/">
                <span className="nav-logo">
                  <GiChefToque />
                </span>
              </Link>
            </li>
          </div>
          {hamClicked ? (
            <div className="nav-responsive-subr">
              {isAuth ? (
                <>
                  <li>
                    {isAuth ? (
                      <Link
                        to="/recipes"
                        onClick={() => {
                          setHamClicked(!hamClicked);
                          setDisplayLeft(true);
                          setDisplayRight(false);
                        }}
                      >
                        My Recipes
                      </Link>
                    ) : null}
                  </li>
                  <li>
                    {isAuth ? (
                      <Link
                        onClick={() => {
                          setHamClicked(!hamClicked);
                          setDisplayLeft(true);
                          setDisplayRight(false);
                        }}
                        to="/friends"
                      >
                        My Friends
                      </Link>
                    ) : null}
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        localStorage.removeItem("token");
                        setAuth(false);
                        setHamClicked(!hamClicked);
                        setDisplayLeft(true);
                        setDisplayRight(false);
                      }}
                      to="/"
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      onClick={() => {
                        setHamClicked(!hamClicked);
                      }}
                    >
                      Login
                    </Link>
                    <></>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      onClick={() => {
                        setHamClicked(!hamClicked);
                      }}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </div>
          ) : null}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
