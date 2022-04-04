import "../styles/pages/HomePage.css";
import svg1 from "../assets/2.svg";
import svg2 from "../assets/1.svg";
import { FaLock, FaUserFriends, FaFileAlt } from "react-icons/fa";

function Home() {
  return (
    <main className="home-main">
      <header>
        <img height="300" width="300" alt="svg" src={svg1} />

        <div className="header-text">
          <h1>Secure Recipes</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <button>Sign Up</button>
        </div>
      </header>
      <section className="sub-section-1">
        <h2>Secure Dem Thangs...</h2>
        <div className="card odd">
          <div className="icon-wrapper">
            <FaLock className="svg1" />
          </div>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
        <div className="card even">
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <div className="icon-wrapper">
            <FaUserFriends className="svg2" />
          </div>
        </div>
        <div className="card odd">
          <div className="icon-wrapper">
            <FaFileAlt className="svg3" />
          </div>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
      </section>
      <section className="sub-section-2">
        <div className="section-text">
          <h1>Secure Recipes</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
        <img height="300" width="300" alt="svg" src={svg2} />
      </section>
      <footer>Website created by Ricardo Castillo</footer>
    </main>
  );
}

export default Home;
