import "../styles/pages/RecipesPage.css";
import LeftSection from "../components/recipes/LeftSection";
import RightSection from "../components/recipes/RightSection";
import LoadingComp from "../components/LoadingComp";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { RecipeContext } from "../RecipeContext";
import { useParams } from "react-router-dom";

function FriendsRecipes() {
  const [viewOnly] = useState(true);
  const [userRecipes, setUserRecipes] = useState([]);
  const [serverMessage, setServerMessage] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const { friendUsername } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .post(`http://localhost:9000/api/users/recipes/${friendUsername}`, {
        token,
      })
      .then((resp) => {
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
        console.dir(err);
      });
  }, []);

  return (
    <main id="recipes-main">
      {serverMessage ? (
        <form
          style={{ width: "25%", marginTop: "8rem", height: "2rem" }}
          className="form"
        >
          <h2>Server Message: {serverMessage}</h2>
        </form>
      ) : (
        <>
          <LeftSection
            userRecipes={userRecipes}
            setSelectedRecipe={setSelectedRecipe}
          />
          {!selectedRecipe ? (
            <LoadingComp />
          ) : (
            <RightSection selectedRecipe={selectedRecipe} viewOnly={viewOnly} />
          )}
        </>
      )}
    </main>
  );
}

export default FriendsRecipes;
