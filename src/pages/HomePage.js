import "../styles/pages/HomePage.css";
import svg1 from "../assets/7.svg";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <section className="home-section">
      <img alt="svg" src={svg1} />

      <h1>Secure Your Recipes Today</h1>
      <div>
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
      </div>
    </section>
  );
}

export default Home;
