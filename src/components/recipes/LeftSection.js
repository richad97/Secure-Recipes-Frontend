import RecipeComp from "./RecipeComp";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/components/recipes/LeftSection.css";

function LeftSection(props) {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const {
    viewOnly,
    userRecipes,
    setSelectedRecipe,
    onPhone,
    setOnPhone,
    setDisplayRight,
    displayLeft,
    setDisplayLeft,
  } = props;

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

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
        {isLoading ? (
          <p>Loading</p>
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
                  setDisplayRight={setDisplayRight}
                  setDisplayLeft={setDisplayLeft}
                  onPhone={onPhone}
                  setOnPhone={setOnPhone}
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
