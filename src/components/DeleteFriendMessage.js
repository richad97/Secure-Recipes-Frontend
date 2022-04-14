import axios from "axios";
import { useContext } from "react";
import { RecipeContext } from "../RecipeContext";

function DeleteFriendMessage(props) {
  const { setFriendDeleteMessage, friendID } = props;
  const { change, setChange } = useContext(RecipeContext);

  return (
    <div className="overlay">
      <div className="delete-recipe-message">
        <h2>Notification</h2>

        <div className="message-wrap">
          <p>
            Are you sure you want to delete this person from your friends list?
          </p>

          <div className="btn-wrap">
            <button
              className="recipe-btn"
              onClick={() => {
                setFriendDeleteMessage(false);
              }}
              style={{ padding: "0.5rem 1rem" }}
            >
              Close
            </button>
            <button
              className="recipe-btn"
              style={{ padding: "0.5rem 1rem" }}
              onClick={() => {
                const token = localStorage.getItem("token");

                axios
                  .delete(
                    `https://secure-recipes-backend.herokuapp.com/api/friends/delete/${friendID}`,
                    { data: { token } }
                  )
                  .then((resp) => {
                    setChange(!change);
                    setFriendDeleteMessage(false);
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

export default DeleteFriendMessage;
