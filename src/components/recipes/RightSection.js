import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/recipes/RightSection.css";

function RightSection(props) {
  const navigate = useNavigate();
  const [convertedUTC, setConvertedUTC] = useState(null);

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

  const {
    setDeleteMessage,
    selectedRecipe,
    onPhone,
    setOnPhone,
    displayRight,
    setDisplayRight,
    displayLeft,
    setDisplayLeft,
  } = props;

  useEffect(() => {
    var dt = new Date(created_at);
    setConvertedUTC(dt.toLocaleDateString());
  }, []);

  return (
    <section id="right-section">
      {title ? (
        <>
          <header>
            <div className="main-title">
              <h1>{title}</h1>
            </div>
            <div className="min-date">
              <span>{prep_time} Minutes</span>
              <span>{convertedUTC}</span>
            </div>
          </header>

          <div className="cont-wrap">
            <div className="top-row">
              <div className="img-cont">
                {pic_url ? (
                  <img height="50" width="50" src={pic_url} />
                ) : (
                  <p>No Photo Available</p>
                )}
              </div>

              <div className="rest-info">
                <p>Category: {category}</p>
                <p>Source: {source}</p>
              </div>
            </div>

            <div className="bottom-row">
              <div className="ingredients">
                <h2>Ingredients</h2>
                <hr />
                <ol>
                  {ingredients
                    ? ingredients.map((ingredient, i) => {
                        return <p key={i}>{ingredient}</p>;
                      })
                    : null}
                </ol>
              </div>

              <div className="instructions">
                <h2>Instructions</h2>
                <hr />
                <p>{instructions}</p>
              </div>
            </div>
          </div>

          {props.viewOnly ? null : (
            <div className="btn-wrap">
              <button
                onClick={() => {
                  navigate(`/recipes/edit/${recipe_id}`);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setDeleteMessage(true);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </>
      ) : (
        <div>
          <p>No Recipes</p>
        </div>
      )}
    </section>
  );
}

export default RightSection;
