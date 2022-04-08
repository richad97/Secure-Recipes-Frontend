import * as Yup from "yup";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "../styles/components/form.css";
import "../styles/pages/ResetPasswordPage.css";

const ResetPasswordFinalSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Must be minimum of 6 characters.")
    .max(50, "Password is too long")
    .required("Password is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
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
                <hr></hr>
                <p>Please login to continue.</p>
              </>
            ) : (
              <>
                <h2>New Password</h2>

                <hr />

                <p>Please enter new password for account.</p>

                <div className="inputs-container">
                  <label>
                    <div className="title-err-cont">
                      <p>New Password:</p>

                      {errors.password && touched.password ? (
                        <p>{errors.password}</p>
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
                      <p>Confirm New Password:</p>

                      {errors.confirmPassword && touched.confirmPassword ? (
                        <p>{errors.confirmPassword}</p>
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
                  <button type="submit">Submit</button>
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
