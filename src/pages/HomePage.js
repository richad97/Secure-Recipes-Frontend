import "../styles/pages/HomePage.css";
import svg1 from "../assets/7.svg";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const navigate = useNavigate();
  return (
    <section className="home-section">
      <img alt="svg" src={svg1} />

      <h1>Secure Your Recipes Today</h1>
      <div style={{ width: "100%" }}>
        {props.isAuth ? (
          <button
            onClick={() => {
              navigate("/recipes");
            }}
          >
            View Recipes
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default Home;
