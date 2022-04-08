import * as Yup from "yup";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import "../styles/components/form.css";
import "../styles/pages/ResetPasswordPage.css";

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid e-mail format").required("Required"),
});

function ResetPassword() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  return (
    <main id="resetpassword-main">
      <Formik
        initialValues={{ email: "" }}
        validationSchema={ResetPasswordSchema}
        onSubmit={(values) => {
          setIsLoading(true);
          const { email } = values;
          axios
            .get(
              `https://secure-recipes-backend.herokuapp.com/api/users/resetpassword/${email.trim()}`
            )
            .then((resp) => {
              setIsLoading(false);
              setSubmitted(true);
            })
            .catch((err) => {
              setIsLoading(false);
              let recievedError = err.response.data.error;
              setServerError(recievedError);
            });
        }}
      >
        {({ errors, touched }) => (
          <Form className="single-forms">
            {submitted ? (
              <>
                <h2>Reset Password</h2>
                <hr />
                <p>Please use link sent through e-mail to proceed.</p>
              </>
            ) : (
              <>
                <h2>Reset Password</h2>

                <hr />

                <p>Please enter e-mail used for the account.</p>

                <div className="inputs-container">
                  <label>
                    <div className="title-err-cont">
                      <p>E-Mail:</p>

                      {errors.email && touched.email ? (
                        <p>{errors.email}</p>
                      ) : null}
                    </div>

                    <Field name="email" placeholder="Enter email here..." />
                  </label>
                </div>

                {serverError ? <p>Server Error: {serverError}</p> : null}

                <div className="btn-wrap">
                  {isLoading ? (
                    <div></div>
                  ) : (
                    <button type="submit">Submit</button>
                  )}
                </div>
              </>
            )}
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default ResetPassword;
