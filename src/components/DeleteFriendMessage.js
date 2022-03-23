import axios from "axios";
import { useContext } from "react";
import { RecipeContext } from "../RecipeContext";

function DeleteFriendMessage(props) {
  const { setFriendDeleteMessage, friendID } = props;
  const { change, setChange } = useContext(RecipeContext);

  return (
    <div className="overlay">
      <div className="message">
        <h3 style={{ padding: "0.2rem 0" }}>Notification</h3>
        <hr />
        <p style={{ padding: "0.5rem 0" }}>
          Are you sure you want to delete this person from your friends list?
        </p>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="btn-global"
            onClick={() => {
              setFriendDeleteMessage(false);
            }}
            style={{ padding: "0.5rem 1rem" }}
          >
            Close
          </button>
          <button
            className="btn-global"
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
  );
}

export default DeleteFriendMessage;
