import axios from "axios";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "../styles/components/form.css";
import "../styles/pages/ResetPasswordPage.css";

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid e-mail format").required("Required"),
});
function ResetPassword() {
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
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <h2 className="form-h2">
              Please enter e-mail used for the account.
            </h2>
            <label className="form-label">
              <p className="form-p">E-Mail:</p>
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              <Field className="form-input" name="email" />
            </label>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default ResetPassword;
