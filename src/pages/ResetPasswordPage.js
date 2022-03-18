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
    <main id="resetpassword-main" className="auth-forms">
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
              <>
                <h2 className="form-h2 auth-forms-h2">Reset Password</h2>
                <hr className="auth-forms-hr" />
                <p className="form-p" style={{ textAlign: "center" }}>
                  Please use link sent through e-mail to proceed.
                </p>
              </>
            ) : (
              <div>
                <h2 className="form-h2 auth-forms-h2">Reset Password</h2>
                <hr className="auth-forms-hr" />
                <p
                  className="form-p"
                  style={{ textAlign: "center", whiteSpace: "nowrap" }}
                >
                  Please enter e-mail used for the account.
                </p>
                <div className="auth-forms-middle-cont">
                  <label className="form-label">
                    <div>
                      <p className="form-p">E-Mail:</p>
                      {errors.email && touched.email ? (
                        <p className="error-val">{errors.email}</p>
                      ) : null}
                    </div>
                    <Field
                      className="form-input auth-forms-inputs"
                      name="email"
                      placeholder="Enter email here..."
                    />
                  </label>
                </div>
                {serverError ? (
                  <p className="error-val">{serverError}</p>
                ) : null}
                <div className="reset-pass-btn-cont">
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
