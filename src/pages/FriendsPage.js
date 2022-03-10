import "../styles/components/form.css";
import "../styles/pages/CreateRecipePage.css";
import { GiChefToque } from "react-icons/gi";

function FriendsPage() {
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
              <th># of Recipes</th>
              <th>Name</th>
              <th>Valid</th>
              <th>View</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>3</td>
              <td>Jane Doe</td>
              <td>Valid</td>
              <td>
                <button className="">View Recipes</button>
              </td>
              <td>
                <button className="">Delete</button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Jane Doe</td>
              <td>Valid</td>
              <td>
                <button className="">View Recipes</button>
              </td>
              <td>
                <button className="">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button className="form-button btn-global ec-submit-btn">
          Add Friend
        </button>
      </div>
    </main>
  );
}

export default FriendsPage;
