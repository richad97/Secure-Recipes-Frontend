import * as Yup from "yup";
import axios from "axios";
import svg1 from "../assets/10.svg";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import "../styles/pages/RegisterPage.css";
import "../styles/components/authForms.css";

const RegisterSchema = Yup.object().shape({
  first_name: Yup.string()
    .max(50, "First name exceeds character limit")
    .required("Required"),
  last_name: Yup.string().max(50, "Last name exceeds character limit"),
  username: Yup.string()
    .min(6, "Must be minimum of 6 characters")
    .max(50, "Username exceeds character limit")
    .required("Required"),
  email: Yup.string().email("Invalid e-mail format").required("Required"),
  password: Yup.string()
    .min(6, "Must be minimum of 6 characters")
    .max(50, "Password is too long")
    .required("Password is required"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

function Register() {
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <main id="register-main">
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          username: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          setIsLoading(true);
          const {
            first_name,
            last_name,
            username,
            email,
            password,
            passwordConfirmation,
          } = values;

          if (
            first_name == false ||
            last_name == false ||
            username == false ||
            password == false ||
            passwordConfirmation == false
          ) {
            throw Error("Values can't be blank space.");
          }
          const newValues = {
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            email: email.trim(),
            username: username.trim(),
            password: password.trim(),
          };
          axios
            .post(
              "https://secure-recipes-backend.herokuapp.com/auth/register",
              newValues
            )
            .then((resp) => {
              setIsLoading(false);
              navigate("/confirmation");
            })
            .catch((err) => {
              console.dir(err);
              setIsLoading(false);
              let recievedErr = err.response.data.error;
              setServerError(recievedErr);
            });
        }}
      >
        {({ errors, touched }) => (
          <Form id="register-form" className="lr-forms">
            <section className="left-section">
              <h2>Register</h2>

              <hr />

              <div className="lr-wrap">
                <div className="lr-input-wrap">
                  <div className="r-flname-wrap">
                    <label>
                      <div className="lr-label-wrap">
                        <p className="">First Name:</p>
                        {errors.first_name && touched.first_name ? (
                          <p className="error-val">{errors.first_name}</p>
                        ) : null}
                      </div>

                      <Field name="first_name" placeholder="John" />
                    </label>

                    <label>
                      <div className="lr-label-wrap">
                        <p>Last Name:</p>
                        {errors.last_name && touched.last_name ? (
                          <p>{errors.last_name}</p>
                        ) : null}
                      </div>

                      <Field name="last_name" type="text" placeholder="Doe" />
                    </label>
                  </div>

                  <label>
                    <div className="lr-label-wrap">
                      <p>Username:</p>
                      {errors.username && touched.username ? (
                        <p>{errors.username}</p>
                      ) : null}
                    </div>

                    <Field
                      name="username"
                      type="text"
                      placeholder="johndoe123"
                    />
                  </label>

                  <label>
                    <div className="lr-label-wrap">
                      <p>E-Mail:</p>
                      {errors.email && touched.email ? (
                        <p>{errors.email}</p>
                      ) : null}
                    </div>

                    <Field
                      name="email"
                      type="email"
                      placeholder="johndoe@gmail.com"
                    />
                  </label>

                  <label className="form-label">
                    <div className="lr-label-wrap">
                      <p>Password:</p>
                      {errors.password && touched.password ? (
                        <p>{errors.password}</p>
                      ) : null}
                    </div>

                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                    />
                  </label>

                  <label>
                    <div className="lr-label-wrap">
                      <p>Confirm Password:</p>
                      {errors.passwordConfirmation &&
                      touched.passwordConfirmation ? (
                        <p>{errors.passwordConfirmation}</p>
                      ) : null}
                    </div>

                    <Field
                      name="passwordConfirmation"
                      type="password"
                      placeholder="Password Confirmation"
                    />
                  </label>

                  {serverError ? (
                    <p className="error-val">Server Error: {serverError}</p>
                  ) : null}
                </div>

                <div className="link-wrap">
                  <Link to="/login">Already a User?</Link>
                </div>

                <div className="lr-btn-wrap">
                  {isLoading ? (
                    <div className="loader"></div>
                  ) : (
                    <button type="submit">Register</button>
                  )}
                </div>
              </div>
            </section>

            <section className="right-section">
              <img height="300" width="300" alt="svg" src={svg1} />
            </section>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default Register;
