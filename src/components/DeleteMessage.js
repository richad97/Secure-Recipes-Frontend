import { RecipeContext } from "../RecipeContext";
import { useContext } from "react";
import axios from "axios";

function DeleteMessage(props) {
  const Context = useContext(RecipeContext);

  return (
    <div className="overlay">
      <div className="message">
        <h3 style={{ padding: "0.2rem 0" }}>Notification</h3>
        <hr />
        <p style={{ padding: "0.5rem 0" }}>
          Are you sure you want to delete this recipe?
        </p>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="btn-global"
            onClick={() => {
              props.setDeleteMessage(false);
            }}
          >
            Close
          </button>
          <button
            className="btn-global"
            onClick={() => {
              const recipeID = Context.selectedRecipe.recipe_id;
              const token = localStorage.getItem("token");
              axios
                .delete(
                  `http://localhost:9000/api/recipes/delete/${recipeID}`,
                  { data: { token } }
                )
                .then((resp) => {
                  props.setDeleteMessage(false);
                  props.setDeleted(!props.isDeleted);
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
  );
}
export default DeleteMessage;
