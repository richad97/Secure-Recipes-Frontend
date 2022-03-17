import "../styles/pages/HomePage.css";
import svg1 from "../assets/7.svg";

function Home() {
  return (
    <section className="home-section">
      <img alt="svg" src={svg1} />

      <h1>Secure Your Recipes Today</h1>
      <div>
        <button>Login</button>
        <button>Sign Up</button>
      </div>
    </section>
  );
}

export default Home;
