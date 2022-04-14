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
  const {
    usingPhone,
    setUsingPhone,
    showLeftSection,
    setLeftSection,
    showRightSection,
    setRightSection,
  } = props;

  useEffect(() => {
    if (window.innerWidth <= 720) {
      setUsingPhone(true);
      setLeftSection(true);
      setRightSection(false);
    }

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
        <form className="single-forms">
          <h2>
            <p>Server Message: {serverMessage}</p>
          </h2>
        </form>
      ) : (
        <>
          {showLeftSection ? (
            <LeftSection
              userRecipes={userRecipes}
              setSelectedRecipe={setSelectedRecipe}
              viewOnly={viewOnly}
              setLeftSection={setLeftSection}
              setRightSection={setRightSection}
              usingPhone={usingPhone}
            />
          ) : null}

          {showRightSection ? (
            <>
              {!selectedRecipe ? (
                <LoadingComp />
              ) : (
                <RightSection
                  selectedRecipe={selectedRecipe}
                  viewOnly={viewOnly}
                  setLeftSection={setLeftSection}
                  setRightSection={setRightSection}
                  usingPhone={usingPhone}
                />
              )}
            </>
          ) : null}
        </>
      )}
    </main>
  );
}

export default FriendsRecipes;
