import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    <section
      id={(() => {
        if (onPhone) {
          if (displayRight) {
            return "section-2";
          } else {
            return "display-none";
          }
        } else {
          return "section-2";
        }
      })()}
    >
      {title ? (
        <>
          <header style={{ width: "100%", margin: "0 auto" }}>
            <div style={{ padding: "1.5rem 2rem ", paddingBottom: "0.5rem" }}>
              <h1>{title}</h1>
              {onPhone ? (
                <button
                  onClick={() => {
                    setDisplayLeft(true);
                    setDisplayRight(false);
                  }}
                >
                  Back
                </button>
              ) : null}
            </div>
            <div style={{ padding: "0 2rem" }}>
              <p>{prep_time} Minutes</p>
              <p>{convertedUTC}</p>
            </div>
          </header>
          <div id="sec2-body">
            <div id="image-info-wrap">
              <div id="image-container">
                {pic_url ? (
                  <img src={pic_url} />
                ) : (
                  <p className="sec2-nophoto">No Photo Available</p>
                )}
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
                      return (
                        <p className="comm1" key={i}>
                          {ingredient}
                        </p>
                      );
                    })
                  : null}
              </ol>
            </div>
            <div className="ii-container">
              <h3>Instructions</h3>
              <hr />
              <p className="comm1">{instructions}</p>
            </div>
            {props.viewOnly ? null : (
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
            )}
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "whitesmoke",
            }}
          >
            No Recipes
          </p>
        </div>
      )}
    </section>
  );
}

export default RightSection;
