import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ConfirmEmailFinal() {
  const { token } = useParams();
  const [serverMessage, setServerMessage] = useState("");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:9000/api/users/confirmation", {
        emailToken: token,
      })
      .then((resp) => {
        const recievedMessage = resp.data.message;

        if (recievedMessage) {
          setServerMessage(recievedMessage);
        }
      })
      .catch((err) => {
        const recievedError = err.response.data.error;

        if (recievedError) {
          setServerError(recievedError);
        }
      });
  }, []);

  return (
    <form
      style={{ width: "30%", height: "10%", marginTop: "5rem" }}
      className="form"
    >
      {serverMessage ? (
        <h2
          className="form-h2 auth-forms-h2"
          style={{ fontSize: "1.25rem", margin: "0 auto" }}
        >
          {serverMessage}
        </h2>
      ) : null}
      {serverError ? (
        <h2
          className="form-h2 auth-forms-h2"
          style={{ fontSize: "1.25rem", margin: "0 auto" }}
        >
          {serverError}
        </h2>
      ) : null}
    </form>
  );
}

export default ConfirmEmailFinal;
