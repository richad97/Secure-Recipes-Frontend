import axios from "axios";
import { Field, Form, Formik } from "formik";
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

  return (
    <main id="resetpassword-main">
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
            });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <h2 className="form-h2">
              Please enter information for new password.
            </h2>
            <label className="form-label">
              <p className="form-p">New Password:</p>
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              <Field className="form-input" name="password" type="password" />
            </label>
            <label className="form-label">
              <p className="form-p">Confirm New Password:</p>
              {errors.confirmPassword && touched.confirmPassword ? (
                <div>{errors.confirmPassword}</div>
              ) : null}
              <Field
                className="form-input"
                name="confirmPassword"
                type="password"
              />
            </label>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default ResetPasswordFinal;
