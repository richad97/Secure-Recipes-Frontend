import { Link, useNavigate } from "react-router-dom";
import "../styles/components/authForms.css";
import "../styles/components/form.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { type } from "@testing-library/user-event/dist/type";

const AddFriendSchema = Yup.object().shape({
  token: Yup.string().required("Required"),
});

function AddFriendPage(props) {
  const navigate = useNavigate();
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
          const shareToken = values.token;
          axios
            .post("http://localhost:9000/api/users/addfriend", {
              token,
              shareToken: shareToken,
            })
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
          <Form className="form">
            <h2 className="form-h2 auth-forms-h2">Add Friend</h2>

            <hr className="auth-forms-hr" />

            <div className="auth-forms-middle-cont">
              <label className="form-label">
                <div>
                  <p className="form-p">Token:</p>
                  {errors.token && touched.token ? (
                    <p className="error-val">{errors.token}</p>
                  ) : null}
                </div>
                <Field
                  className="form-input auth-forms-inputs"
                  name="token"
                  placeholder="Enter token here..."
                />
              </label>
            </div>
            {serverError ? (
              <p className="error-val">Server Error: {serverError}</p>
            ) : null}
            {serverSuccess ? (
              <p className="error-val" style={{ color: "green" }}>
                {serverSuccess}
              </p>
            ) : null}
            <button
              id="log-btn"
              className="form-button btn-global auth-forms-btn"
              type="submit"
            >
              Add Friend
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default AddFriendPage;
