import "../../styles/components/recipes/LeftSection.css";
import { BiSearch } from "react-icons/bi";
import RecipeComp from "./RecipeComp";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
    <section id={displayLeft ? "section-1" : "display-none"}>
      <label id="search-bar-container">
        <BiSearch />
        <input
          id="search-bar"
          type="search"
          placeholder="Search for your recipes here..."
          onChange={handleInput}
        ></input>
      </label>
      <div id="recipe-container">
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

      {viewOnly ? (
        <div className="ls-no-btn"></div>
      ) : (
        <button
          onClick={() => {
            navigate("/recipes/create");
          }}
        >
          <p className="ls-add-btn">Add Recipe </p>
        </button>
      )}
    </section>
  );
}

export default LeftSection;
