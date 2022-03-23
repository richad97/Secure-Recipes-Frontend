import "../styles/components/form.css";
import "../styles/pages/FriendsPage.css";
import { GiChefToque } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { RecipeContext } from "../RecipeContext";
import axios from "axios";

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
        console.log("u");

        if (!recievedData.message) {
          setFriends([...friendsList]);
          setShareToken(shareToken);
        } else {
          setServerMessage(recievedData.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [change]);

  return (
    <main id="crecipe-main">
      {serverMessage ? (
        <form
          style={{ width: "30%", height: "15%", marginTop: "5rem" }}
          className="form"
        >
          <h2
            className="form-h2 auth-forms-h2"
            style={{ fontSize: "1.2rem", margin: "0.5rem auto" }}
          >
            Server Message: {serverMessage}
          </h2>
        </form>
      ) : (
        <div className="form">
          <header className="form-header ec-header">
            <span className="ec-logo">
              <GiChefToque />
            </span>
            <h2 className="form-h2 ec-h2">Friends</h2>
          </header>
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
                        className="btn-sm"
                        onClick={() => {
                          navigate(`/recipes/${friend.username}`);
                        }}
                      >
                        Recipes
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          props.setFriendDeleteMessage(true);
                          props.setFriendID(friend.id);
                        }}
                        className="btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="friends-btn-cont">
            <p>
              Share Token: <span>{shareToken}</span>
            </p>
            <button
              onClick={() => {
                navigate("/addfriend");
              }}
              className="btn-global friends-btn-cont"
            >
              Add Friend
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default FriendsPage;
