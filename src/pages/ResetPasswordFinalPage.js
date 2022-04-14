import * as Yup from "yup";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "../styles/form.css";
import "../styles/pages/ResetPasswordPage.css";

const ResetPasswordFinalSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Minimum is 6 characters.")
    .max(50, "Password is too long")
    .required("Password is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match."
  ),
});

function ResetPasswordFinal() {
  const { token } = useParams();
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  return (
    <main id="resetpassword-main">
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={ResetPasswordFinalSchema}
        onSubmit={(values) => {
          axios
            .post(
              "https://secure-recipes-backend.herokuapp.com/api/users/resetpassword",
              {
                emailToken: token,
                newPassword: values.password.trim(),
              }
            )
            .then((resp) => {
              setSuccess(true);
            })
            .catch((err) => {
              const recievedError = err.response.data.error;
              setServerError(recievedError);
            });
        }}
      >
        {({ errors, touched }) => (
          <Form className="single-forms">
            {success ? (
              <>
                <h2>Success</h2>
                <p>Please login to continue.</p>
              </>
            ) : (
              <>
                <h2>New Password</h2>

                <p>Please enter new password for account.</p>

                <div className="inputs-container">
                  <label>
                    <div className="title-err-cont">
                      <p className="label-title">New Password:</p>

                      {errors.password && touched.password ? (
                        <p className="label-error">{errors.password}</p>
                      ) : null}
                    </div>

                    <Field
                      name="password"
                      type="password"
                      placeholder="Enter new password here..."
                    />
                  </label>

                  <label>
                    <div className="title-err-cont">
                      <p className="label-title">Confirm New Password:</p>

                      {errors.confirmPassword && touched.confirmPassword ? (
                        <p className="label-error">{errors.confirmPassword}</p>
                      ) : null}
                    </div>

                    <Field
                      name="confirmPassword"
                      type="password"
                      placeholder="Enter password confirmation here..."
                    />
                  </label>

                  {serverError ? <p>Server Error: {serverError}</p> : null}
                </div>

                <div className="btn-wrap">
                  <button className="recipe-btn" type="submit">
                    Submit
                  </button>
                </div>
              </>
            )}
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default ResetPasswordFinal;
