import RecipeComp from "./RecipeComp";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import "../../styles/components/recipes/LeftSection.css";

function LeftSection(props) {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const {
    viewOnly,
    userRecipes,
    setSelectedRecipe,
    setLeftSection,
    setRightSection,
    usingPhone,
  } = props;

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <section id="left-section">
      <label id="ls-search-bar">
        <BiSearch />
        <input
          type="search"
          placeholder="Search for your recipes here..."
          onChange={handleInput}
        ></input>
      </label>

      <div className="recipe-comp-container">
        {userRecipes.length === 0 ? (
          <div className="spinner-wrap">
            <p>No recipes...</p>
            {/* <BiLoaderCircle className="spinner" /> */}
          </div>
        ) : (
          userRecipes
            .filter((recipe) => {
              if (query === "") {
                return recipe;
              } else if (
                recipe.title.toLowerCase().includes(query.toLowerCase())
              ) {
                return recipe;
              }
            })
            .map((recipe, i) => {
              return (
                <RecipeComp
                  setLeftSection={setLeftSection}
                  setRightSection={setRightSection}
                  usingPhone={usingPhone}
                  setSelectedRecipe={setSelectedRecipe}
                  recipe={recipe}
                  key={i}
                />
              );
            })
        )}
      </div>

      <div className="btn-wrap">
        {viewOnly ? (
          <div></div>
        ) : (
          <button
            className="recipe-btn"
            onClick={() => {
              navigate("/recipes/create");
            }}
          >
            Add Recipe
          </button>
        )}
      </div>
    </section>
  );
}

export default LeftSection;
