import axios from "axios";
import { useNavigate } from "react-router-dom";

function DeleteFriendMessage(props) {
  const { setFriendDeleteMessage, friendID } = props;
  const navigate = useNavigate();

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
          >
            Close
          </button>
          <button
            className="btn-global"
            onClick={() => {
              const token = localStorage.getItem("token");

              axios
                .delete(
                  `http://localhost:9000/api/users/friends/delete/${friendID}`,
                  { data: { token } }
                )
                .then((resp) => {
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
