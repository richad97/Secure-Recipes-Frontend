import "../styles/components/form.css";
import "../styles/pages/CreateRecipePage.css";
import { GiChefToque } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function FriendsPage() {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
      .post("http://localhost:9000/api/users/friends", {
        token,
      })
      .then((resp) => {
        const data = resp.data;

        setFriends([...data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    console.log(friends);
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
                    <button className="">View Recipes</button>
                  </td>
                  <td>
                    <button className="">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          onClick={() => {
            navigate("/addfriend");
          }}
          className="form-button btn-global ec-submit-btn"
        >
          Add Friend
        </button>
      </div>
    </main>
  );
}

export default FriendsPage;
