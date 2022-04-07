import { useEffect, useState } from "react";
import "../../styles/components/recipes/RecipeComp.css";

function RecipeComp(props) {
  const [convertedUTC, setConvertedUTC] = useState(null);

  const {
    recipe,
    setSelectedRecipe,
    onPhone,
    setOnPhone,
    setDisplayLeft,
    setDisplayRight,
  } = props;

  const handleClick = () => {
    // console.log(recipe);
    setSelectedRecipe(recipe);
    if (onPhone) {
      //make sec1 display none
      //make sec2 display
      setDisplayLeft(false);
      setDisplayRight(true);
    }
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
