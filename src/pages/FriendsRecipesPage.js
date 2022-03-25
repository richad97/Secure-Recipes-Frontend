import "../styles/pages/RecipesPage.css";
import LeftSection from "../components/recipes/LeftSection";
import RightSection from "../components/recipes/RightSection";
import LoadingComp from "../components/LoadingComp";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function FriendsRecipes(props) {
  const [viewOnly] = useState(true);
  const [userRecipes, setUserRecipes] = useState([]);
  const [serverMessage, setServerMessage] = useState("");
  const {
    onPhone,
    setOnPhone,
    displayLeft,
    setDisplayLeft,
    displayRight,
    setDisplayRight,
  } = props;
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { friendUsername } = useParams();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 790) {
      setOnPhone(true);
      setDisplayRight(false);
    }

    const token = localStorage.getItem("token");

    setLoading(true);
    axios
      .post(`http://localhost:9000/api/friends/recipes/${friendUsername}`, {
        token,
      })
      .then((resp) => {
        setLoading(false);
        const recievedData = resp.data;

        if (!recievedData.message) {
          setSelectedRecipe({ ...recievedData[0] });
          setUserRecipes(recievedData);
        } else {
          setServerMessage(recievedData.message);
          setSelectedRecipe({});
          setUserRecipes([]);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.dir(err);
      });
  }, []);

  return (
    <main id="recipes-main">
      {serverMessage ? (
        <form
          style={{ width: "30%", height: "15%", marginTop: "5rem" }}
          className="form"
        >
          <h2
            className="form-h2 auth-forms-h2"
            style={{ fontSize: "1.2rem", margin: "0.5rem auto" }}
          >
            Server Message: {serverMessage}
          </h2>
        </form>
      ) : (
        <>
          <LeftSection
            userRecipes={userRecipes}
            setSelectedRecipe={setSelectedRecipe}
            viewOnly={viewOnly}
            onPhone={onPhone}
            setOnPhone={setOnPhone}
            setDisplayRight={setDisplayRight}
            displayLeft={displayLeft}
            setDisplayLeft={setDisplayLeft}
          />
          {!selectedRecipe ? (
            <LoadingComp />
          ) : (
            <RightSection
              displayLeft={displayLeft}
              setDisplayLeft={setDisplayLeft}
              displayRight={displayRight}
              setDisplayRight={setDisplayRight}
              onPhone={onPhone}
              setOnPhone={setOnPhone}
              selectedRecipe={selectedRecipe}
              viewOnly={viewOnly}
            />
          )}
        </>
      )}
    </main>
  );
}

export default FriendsRecipes;
