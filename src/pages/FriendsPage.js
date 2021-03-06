import axios from "axios";
import main from "../assets/main.svg";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { RecipeContext } from "../RecipeContext";
import "../styles/form.css";
import "../styles/pages/FriendsPage.css";

function FriendsPage(props) {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [shareToken, setShareToken] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const { change, setChange } = useContext(RecipeContext);

  useEffect(() => {
    let token = localStorage.getItem("token");

    axios
      .post("https://secure-recipes-backend.herokuapp.com/api/friends", {
        token,
      })
      .then((resp) => {
        const friendsList = resp.data.usersFriends;
        const shareToken = resp.data.shareToken;
        const recievedData = resp.data;

        setFriends([...friendsList]);
        setShareToken(shareToken);
      })
      .catch((err) => {
        const recievedData = err.response.data.error;
        setServerMessage(recievedData);
      });
  }, [change]);

  return (
    <main id="friends-main">
      {serverMessage ? (
        <form className="single-forms">
          <h2>Message</h2>
          <p>{serverMessage}</p>
        </form>
      ) : (
        <div className="ce-forms">
          <header>
            <img src={main} />
            <h2>Friends</h2>
          </header>

          <div className="main-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>View Recipes</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {friends.map((friend) => {
                  return (
                    <tr key={friend.id}>
                      <td>{friend.id}</td>
                      <td>{friend.username}</td>
                      <td>
                        <button
                          className="recipe-btn"
                          onClick={() => {
                            navigate(`/recipes/${friend.username}`);
                          }}
                        >
                          Recipes
                        </button>
                      </td>
                      <td>
                        <button
                          className="recipe-btn"
                          style={{ backgroundColor: "rgb(239, 87, 87)" }}
                          onClick={() => {
                            props.setFriendDeleteMessage(true);
                            props.setFriendID(friend.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="btn-wrap">
              <p>
                Share Token: <span>{shareToken}</span>
              </p>

              <button
                className="recipe-btn"
                onClick={() => {
                  navigate("/addfriend");
                }}
              >
                Add Friend
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default FriendsPage;
