import svg1 from "../assets/2.svg";
import svg2 from "../assets/1.svg";
import { FaLock, FaUserFriends, FaFileAlt } from "react-icons/fa";
import "../styles/pages/HomePage.css";

function Home() {
  return (
    <main className="home-main">
      <header>
        <img height="300" width="300" alt="svg" src={svg1} />

        <div className="header-text">
          <h1>Secure Recipes</h1>
          <p>
            Securely store your recipes before you forget! Secure Recipes is an
            web application that allows you to store recipes within a secure
            account and share those recipes with your friends. Sign up and try
            today!
          </p>
          <button>Sign Up</button>
        </div>
      </header>

      <section className="sub-section-1">
        <h2>Secure Dem Thangs...</h2>

        <div className="card-wrapper">
          <div className="card odd">
            <div className="icon-wrapper">
              <FaLock className="svg1" />
            </div>

            <p>
              Secure Recipes persists data using PostgreSQL and stores sensitive
              data like your passwords using BCrypt. The authorization is done
              using JSON Web Tokens (JWT) which gives each user safe and private
              access to their data.
            </p>
          </div>

          <div className="card even">
            <p>
              Connect with friends! Each new user comes with an automatically
              generated token which is meant to share amongst friends. Once that
              token is shared, recipes between the user and the friend can be
              seen at any time.
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
              Back up your recipes and keep them all in one spot using Secure
              Recipes. Having a physical copy of your recipes is nice and all,
              but having a back up of them online is even better. Store an
              unlimited amount of recipes using Secure Recipes today!
            </p>
          </div>
        </div>
      </section>

      <section className="sub-section-2">
        <div className="section-text">
          <h1>The Point...</h1>
          <p>
            Secure Recipes was created to show what the amount of functionality
            I can implement within an application by myself. After this project
            I will be shifting my focus solely on front-end web development, but
            I built this project to show that I am capable of doing both.
          </p>
        </div>
        <img height="300" width="300" alt="svg" src={svg2} />
      </section>

      <footer>Website created by Ricardo Castillo</footer>
    </main>
  );
}

export default Home;
