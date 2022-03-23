import { Link, useNavigate } from "react-router-dom";
import "../styles/components/authForms.css";
import "../styles/components/form.css";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useState } from "react";

const RegisterSchema = Yup.object().shape({
  first_name: Yup.string()
    .max(50, "First name exceeds character limit")
    .required("Required"),
  last_name: Yup.string().max(50, "Last name exceeds character limit"),
  username: Yup.string()
    .min(3, "Must be minimum of 3 characters")
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
    <main id="register-main" className="auth-forms">
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
              setIsLoading(false);
              let recievedErr = err.response.data.error;
              setServerError(recievedErr);
            });
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <h2 className="form-h2 auth-forms-h2">Register</h2>

            <hr className="auth-forms-hr" />

            <div className="auth-forms-middle-cont">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <label className="form-label" style={{ width: "48%" }}>
                  <div>
                    <p className="form-p">First Name:</p>
                    {errors.first_name && touched.first_name ? (
                      <p className="error-val">{errors.first_name}</p>
                    ) : null}
                  </div>
                  <Field
                    className="form-input auth-forms-inputs"
                    name="first_name"
                    placeholder="John"
                  />
                </label>
                <label className="form-label" style={{ width: "48%" }}>
                  <div>
                    <p className="form-p">Last Name:</p>
                    {errors.last_name && touched.last_name ? (
                      <p className="error-val">{errors.last_name}</p>
                    ) : null}
                  </div>
                  <Field
                    className="form-input auth-forms-inputs"
                    name="last_name"
                    placeholder="Doe"
                  />
                </label>
              </div>
              <label className="form-label">
                <div>
                  <p className="form-p">Username:</p>
                  {errors.username && touched.username ? (
                    <p className="error-val">{errors.username}</p>
                  ) : null}
                </div>
                <Field
                  className="form-input auth-forms-inputs"
                  name="username"
                  placeholder="johndoe123"
                />
              </label>
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
                  placeholder="johndoe@gmail.com"
                />
              </label>
              <label className="form-label">
                <div>
                  <p className="form-p">Password:</p>
                  {errors.password && touched.password ? (
                    <p className="error-val">{errors.password}</p>
                  ) : null}
                </div>
                <Field
                  className="form-input auth-forms-inputs"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </label>
              <label className="form-label">
                <div>
                  <p className="form-p">Confirm Password:</p>
                  {errors.passwordConfirmation &&
                  touched.passwordConfirmation ? (
                    <p className="error-val">{errors.passwordConfirmation}</p>
                  ) : null}
                </div>
                <Field
                  className="form-input auth-forms-inputs"
                  name="passwordConfirmation"
                  type="password"
                  placeholder="Password Confirmation"
                />
              </label>
            </div>
            {serverError ? (
              <p className="error-val">Server Error: {serverError}</p>
            ) : null}
            {isLoading ? (
              <div
                className="loader"
                style={{
                  height: "12px",
                  width: "12px",
                  margin: "0 auto",
                  marginBottom: "1rem",
                }}
              ></div>
            ) : (
              <button
                className="form-button btn-global auth-forms-btn"
                type="submit"
              >
                Register
              </button>
            )}
            <Link className="form-a" to="/login">
              Already a User?
            </Link>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default Register;
