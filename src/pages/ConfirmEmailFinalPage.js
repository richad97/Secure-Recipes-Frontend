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
    <form style={{ width: "25%", marginTop: "8rem" }} className="form">
      {serverMessage ? <h2>{serverMessage}</h2> : null}
      {serverError ? <h2>{serverError}</h2> : null}
    </form>
  );
}

export default ConfirmEmailFinal;
