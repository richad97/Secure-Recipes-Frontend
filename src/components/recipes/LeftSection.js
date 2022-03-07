import "../../styles/components/recipes/LeftSection.css";
import { BiSearch } from "react-icons/bi";
import RecipeComp from "./RecipeComp";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function LeftSection(props) {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const { userRecipes, setSelectedRecipe } = props;

  const handleInput = (e) => {
    setQuery(e.target.value);
  };
  console.log(typeof userRecipes);

  return (
    <section id="section-1">
      <label>
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
                  setSelectedRecipe={setSelectedRecipe}
                  recipe={recipe}
                  key={i}
                />
              );
            })
        )}
      </div>
      <button
        onClick={() => {
          navigate("/recipes/create");
        }}
      >
        <p className="ls-add-btn">Add Recipe </p>
      </button>
    </section>
  );
}

export default LeftSection;
