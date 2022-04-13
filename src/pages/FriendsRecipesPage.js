import axios from "axios";
import LeftSection from "../components/recipes/LeftSection";
import RightSection from "../components/recipes/RightSection";
import LoadingComp from "../components/LoadingComp";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/pages/RecipesPage.css";

function FriendsRecipes(props) {
  const [viewOnly] = useState(true);
  const [userRecipes, setUserRecipes] = useState([]);
  const [serverMessage, setServerMessage] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { friendUsername } = useParams();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    setLoading(true);
    axios
      .post(
        `https://secure-recipes-backend.herokuapp.com/api/friends/recipes/${friendUsername}`,
        {
          token,
        }
      )
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
