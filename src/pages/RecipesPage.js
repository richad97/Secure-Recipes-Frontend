import "../styles/pages/RecipesPage.css";
import LeftSection from "../components/recipes/LeftSection";
import RightSection from "../components/recipes/RightSection";
import LoadingComp from "../components/LoadingComp";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { RecipeContext } from "../RecipeContext";

function Recipes(props) {
  const [userRecipes, setUserRecipes] = useState([]);
  const [serverMessage, setServerMessage] = useState("");
  const { setDeleteMessage, isDeleted } = props;
  const { selectedRecipe, setSelectedRecipe } = useContext(RecipeContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:9000/api/recipes", {
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
        console.log(err);
      });
  }, [isDeleted]);

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
            <RightSection
              setDeleteMessage={setDeleteMessage}
              selectedRecipe={selectedRecipe}
            />
          )}
        </>
      )}
    </main>
  );
}

export default Recipes;
