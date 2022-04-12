import axios from "axios";
import { RecipeContext } from "../RecipeContext";
import { useContext } from "react";

function DeleteMessage(props) {
  const Context = useContext(RecipeContext);
  const {
    setDeleted,
    setDeleteMessage,
    isDeleted,
    displayLeft,
    setDisplayLeft,
    displayRight,
    setDisplayRight,
  } = props;

  return (
    <div className="overlay">
      <div className="delete-recipe-message">
        <h2>Notification</h2>
        <div className="message-wrap">
          <p>Are you sure you want to delete this recipe?</p>

          <div className="btn-wrap">
            <button
              className="recipe-btn"
              onClick={() => {
                setDeleteMessage(false);
              }}
            >
              Close
            </button>
            <button
              className="recipe-btn"
              onClick={() => {
                const recipeID = Context.selectedRecipe.recipe_id;
                const token = localStorage.getItem("token");
                axios
                  .delete(
                    `https://secure-recipes-backend.herokuapp.com/api/recipes/delete/${recipeID}`,
                    { data: { token } }
                  )
                  .then((resp) => {
                    setDeleteMessage(false);
                    setDeleted(!isDeleted);
                    setDisplayLeft(true);
                    setDisplayRight(false);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeleteMessage;
