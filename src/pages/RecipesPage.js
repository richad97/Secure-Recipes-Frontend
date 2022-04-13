import axios from "axios";
import LeftSection from "../components/recipes/LeftSection";
import RightSection from "../components/recipes/RightSection";
import LoadingComp from "../components/LoadingComp";
import { useContext, useEffect, useState } from "react";
import { RecipeContext } from "../RecipeContext";
import "../styles/pages/RecipesPage.css";

function Recipes(props) {
  const [userRecipes, setUserRecipes] = useState([]);
  const [serverMessage, setServerMessage] = useState("");
  const { setDeleteMessage, isDeleted } = props;
  const { selectedRecipe, setSelectedRecipe } = useContext(RecipeContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .post("https://secure-recipes-backend.herokuapp.com/api/recipes", {
        token,
      })
      .then((resp) => {
        const recievedData = resp.data;

        setSelectedRecipe({ ...recievedData[0] });
        setUserRecipes(recievedData);
      })
      .catch((err) => {
        let recievedErr = err.response.data.error;
        setServerMessage(recievedErr);
        setSelectedRecipe({});
        setUserRecipes([]);
      });
  }, [isDeleted]);

  return (
    <main id="recipes-main">
      {serverMessage ? (
        <form className="single-forms">
          <h2>Message</h2>
          <p>{serverMessage}</p>
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
