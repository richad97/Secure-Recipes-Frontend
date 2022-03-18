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
  const {
    setDeleteMessage,
    isDeleted,
    onPhone,
    setOnPhone,
    displayLeft,
    setDisplayLeft,
    displayRight,
    setDisplayRight,
  } = props;
  const { selectedRecipe, setSelectedRecipe } = useContext(RecipeContext);

  useEffect(() => {
    if (window.innerWidth <= 790) {
      setOnPhone(true);
      setDisplayRight(false);
    }

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
              setDeleteMessage={setDeleteMessage}
              selectedRecipe={selectedRecipe}
              onPhone={onPhone}
              setOnPhone={setOnPhone}
            />
          )}
        </>
      )}
    </main>
  );
}

export default Recipes;
