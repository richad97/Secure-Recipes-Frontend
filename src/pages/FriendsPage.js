import axios from "axios";
import { GiChefToque } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { RecipeContext } from "../RecipeContext";
import "../styles/components/form.css";
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
        console.log(recievedData);
        setServerMessage(recievedData);
      });
  }, [change]);

  return (
    <main id="friends-main">
      {serverMessage ? (
        <form>
          <h2>Server Message: {serverMessage}</h2>
        </form>
      ) : (
        <div className="ce-forms">
          <header>
            <span>
              <GiChefToque />
            </span>
            <h2>Friends</h2>
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
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div>
            <p>
              Share Token: <span>{shareToken}</span>
            </p>

            <button
              onClick={() => {
                navigate("/addfriend");
              }}
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
