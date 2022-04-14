import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ConfirmEmailFinal() {
  const { token } = useParams();
  const [serverMessage, setServerMessage] = useState("");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    axios
      .post(
        "https://secure-recipes-backend.herokuapp.com/api/users/confirmation",
        {
          emailToken: token,
        }
      )
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
    <form className="single-forms">
      <h2>Message</h2>
      {serverMessage ? <p>{serverMessage}</p> : null}
      {serverError ? <p>{serverError}</p> : null}
    </form>
  );
}

export default ConfirmEmailFinal;
