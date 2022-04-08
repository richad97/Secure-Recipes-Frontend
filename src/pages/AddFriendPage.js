import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import "../styles/components/authForms.css";
import "../styles/components/form.css";
import "../styles/pages/AddFriendPage.css";

const AddFriendSchema = Yup.object().shape({
  token: Yup.string().required("Required"),
});

function AddFriendPage(props) {
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");

  return (
    <main id="addfriend-main">
      <Formik
        initialValues={{
          token: "",
        }}
        validationSchema={AddFriendSchema}
        onSubmit={(values) => {
          const token = localStorage.getItem("token");
          const shareToken = values.token.trim();
          axios
            .post(
              "https://secure-recipes-backend.herokuapp.com/api/friends/addfriend",
              {
                token,
                shareToken: shareToken,
              }
            )
            .then((resp) => {
              const recievedMessage = resp.data;

              if (typeof recievedMessage === "string") {
                setServerError(recievedMessage);
              } else {
                setServerError("");
                setServerSuccess("Successfully added friend!");
              }
            })
            .catch((err) => {
              const recievedError = err.response.data.error;
              setServerError(recievedError);
            });
        }}
      >
        {({ errors, touched }) => (
          <Form className="single-forms">
            <h2>Add Friend</h2>

            <hr />

            <p>Please enter token used to add friend.</p>

            <div className="inputs-container">
              <label>
                <div className="title-err-cont">
                  <p>Token:</p>
                  {errors.token && touched.token ? <p>{errors.token}</p> : null}
                </div>
                <Field name="token" placeholder="Enter token here..." />
              </label>
            </div>

            {serverError ? <p>Server Error: {serverError}</p> : null}

            {serverSuccess ? <p>{serverSuccess}</p> : null}

            <div className="btn-wrap">
              <button type="submit">Add Friend</button>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default AddFriendPage;
