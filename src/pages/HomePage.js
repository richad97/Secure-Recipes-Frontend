// import video from "../home.mp4";
import "../styles/pages/HomePage.css";

function Home() {
  return (
    <div className="vid-container">
      <video autoPlay muted loop>
        <source src="" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Home;
