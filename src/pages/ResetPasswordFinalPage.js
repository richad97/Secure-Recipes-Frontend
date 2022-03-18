import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import "../styles/components/form.css";
import "../styles/pages/ResetPasswordPage.css";
const ResetPasswordFinalSchema = Yup.object().shape({
  password: Yup.string()
    // .min(6, "Must be minimum of 6 characters.")
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

  return (
    <main id="resetpassword-main" className="auth-forms">
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={ResetPasswordFinalSchema}
        onSubmit={(values) => {
          axios
            .post("http://localhost:9000/api/users/resetpassword", {
              emailToken: token,
              newPassword: values.password.trim(),
            })
            .then((resp) => {
              console.log(resp);
            })
            .catch((err) => {
              console.log(err);
              const recievedError = err.response.data.error;
              setServerError(recievedError);
            });
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <h2 className="form-h2 auth-forms-h2">New Password</h2>
            <hr className="auth-forms-hr"></hr>
            <div className="auth-forms-middle-cont">
              <label className="form-label">
                <div>
                  <p className="form-p">New Password:</p>
                  {errors.password && touched.password ? (
                    <p className="error-val">{errors.password}</p>
                  ) : null}
                </div>
                <Field className="form-input" name="password" type="password" />
              </label>
              <label className="form-label">
                <div>
                  <p className="form-p">Confirm New Password:</p>
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <p className="error-val">{errors.confirmPassword}</p>
                  ) : null}
                </div>
                <Field
                  className="form-input"
                  name="confirmPassword"
                  type="password"
                />
              </label>
              {serverError ? (
                <p className="error-val">Server Error: {serverError}</p>
              ) : null}
            </div>

            <div className="reset-pass-btn-cont">
              <button
                className="btn-global"
                style={{ width: "20%" }}
                type="submit"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default ResetPasswordFinal;
