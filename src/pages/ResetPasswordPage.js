import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "../styles/components/form.css";
import "../styles/pages/ResetPasswordPage.css";

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid e-mail format").required("Required"),
});

function ResetPassword() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  return (
    <main id="resetpassword-main">
      <Formik
        initialValues={{ email: "" }}
        validationSchema={ResetPasswordSchema}
        onSubmit={(values) => {
          const { email } = values;
          axios
            .get(
              `http://localhost:9000/api/users/resetpassword/${email.trim()}`
            )
            .then((resp) => {
              console.log(resp);
              setSubmitted(true);
            })
            .catch((err) => {
              console.dir(err);
              let recievedError = err.response.data.message;
              setServerError(recievedError);
            });
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            {submitted ? (
              <div>Please use link sent through e-mail to proceed.</div>
            ) : (
              <div>
                <h2 className="form-h2">
                  Please enter e-mail used for the account.
                </h2>
                <label className="form-label">
                  <div>
                    <p className="form-p">E-Mail:</p>
                    {errors.email && touched.email ? (
                      <p className="error-val">{errors.email}</p>
                    ) : null}
                  </div>
                  <Field
                    className="form-input"
                    name="email"
                    placeholder="Enter email here..."
                  />
                </label>
                {serverError ? (
                  <p className="error-val">{serverError}</p>
                ) : null}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button className="btn-global" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default ResetPassword;
