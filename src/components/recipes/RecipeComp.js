import { useEffect, useState } from "react";
import "../../styles/components/recipes/RecipeComp.css";

function RecipeComp(props) {
  const [convertedUTC, setConvertedUTC] = useState(null);

  const { recipe, setSelectedRecipe } = props;

  const handleClick = () => {
    // console.log(recipe);
    setSelectedRecipe(recipe);
  };

  useEffect(() => {
    var dt = new Date(recipe.created_at);
    setConvertedUTC(dt.toLocaleDateString());
  }, []);

  return (
    <div id="recipe-comp" onClick={handleClick}>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <hr></hr>
      <div className="min-date2">
        <p>{recipe.prep_time} Minutes</p>
        <p>Created: {convertedUTC}</p>
      </div>
    </div>
  );
}

export default RecipeComp;
