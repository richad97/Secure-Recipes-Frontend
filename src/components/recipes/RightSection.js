import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../RecipeContext";
import "../../styles/components/recipes/RightSection.css";

function RightSection(props) {
  const [convertedUTC, setConvertedUTC] = useState(null);

  const navigate = useNavigate();
  const {
    category,
    created_at,
    description,
    ingredients,
    instructions,
    pic_url,
    recipe_id,
    source,
    title,
    prep_time,
    username,
  } = props.selectedRecipe;

  useEffect(() => {
    var dt = new Date(created_at);
    setConvertedUTC(dt.toLocaleDateString());
    console.log(ingredients);
  }, []);

  return (
    <section id="section-2">
      <header>
        <h1>{title}</h1>
        <div>
          <p>{prep_time} Minutes</p>
          <p>{convertedUTC}</p>
        </div>
      </header>
      <div id="sec2-body">
        <div id="image-info-wrap">
          <div id="image-container">
            {pic_url ? <img src={pic_url} /> : null}
          </div>
          <div id="recipe-info">
            <p>Category: {category}</p>
            <p>Source: {source}</p>
          </div>
        </div>

        <div className="ii-container">
          <h3>Ingredients</h3>
          <hr />
          <ol>
            {ingredients
              ? ingredients.map((ingredient, i) => {
                  return <li key={i}>{ingredient}</li>;
                })
              : null}
          </ol>
        </div>
        <div className="ii-container">
          <h3>Instructions</h3>
          <hr />
          <p>{instructions}</p>
        </div>
        <div id="button-wrapper">
          <button
            className="btn-global"
            onClick={() => {
              navigate(`/recipes/edit/${recipe_id}`);
            }}
          >
            Edit
          </button>
          <button
            className="btn-global"
            onClick={() => {
              props.setDeleteMessage(true);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
}

export default RightSection;
