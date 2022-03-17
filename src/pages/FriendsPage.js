import "../styles/components/form.css";
import "../styles/pages/FriendsPage.css";
import { GiChefToque } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function FriendsPage(props) {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [shareToken, setShareToken] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
      .post("http://localhost:9000/api/users/friends", {
        token,
      })
      .then((resp) => {
        const friendsList = resp.data.usersFriends;
        const shareToken = resp.data.shareToken;

        setFriends([...friendsList]);
        setShareToken(shareToken);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    // console.log(friends);
  }, [friends]);

  return (
    <main id="crecipe-main">
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
              <th>View</th>
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
                      View Recipes
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        props.setFriendDeleteMessage(true);
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
    </main>
  );
}

export default FriendsPage;