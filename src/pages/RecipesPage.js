import "../styles/pages/RecipesPage.css";
import LeftSection from "../components/recipes/LeftSection";
import RightSection from "../components/recipes/RightSection";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { RecipeContext } from "../RecipeContext";

function Recipes(props) {
  const [userRecipes, setUserRecipes] = useState([]);
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

        setSelectedRecipe({ ...recievedData[0] });
        setUserRecipes(recievedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isDeleted]);

  return (
    <main id="recipes-main">
      <LeftSection
        userRecipes={userRecipes}
        setSelectedRecipe={setSelectedRecipe}
      />
      {!selectedRecipe ? (
        <p>Loading</p>
      ) : (
        <RightSection
          setDeleteMessage={setDeleteMessage}
          selectedRecipe={selectedRecipe}
        />
      )}
    </main>
  );
}

export default Recipes;
