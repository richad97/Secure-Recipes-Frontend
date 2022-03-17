import axios from "axios";

function DeleteFriendMessage(props) {
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
              props.setFriendDeleteMessage(false);
            }}
          >
            Close
          </button>
          <button className="btn-global" onClick={() => {}}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteFriendMessage;
