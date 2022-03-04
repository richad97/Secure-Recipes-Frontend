import "../../styles/components/recipes/RecipeComp.css";
import { useEffect, useState } from "react";

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
    <div className="recipe-comp" onClick={handleClick}>
      <h4>{recipe.title}</h4>
      <p>{recipe.description}</p>
      <hr></hr>
      <div>
        <p>{recipe.prep_time} Minutes</p>
        <p>Created: {convertedUTC}</p>
      </div>
    </div>
  );
}

export default RecipeComp;
