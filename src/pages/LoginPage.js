import * as Yup from "yup";
import axios from "axios";
import svg1 from "../assets/3.svg";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import "../styles/pages/LoginPage.css";
import "../styles/components/authForms.css";
import "../styles/components/form.css";

const LoginPageSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

function Login(props) {
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isAuth, setAuth } = props;
  const Navigate = useNavigate();

  return (
    <main id="login-main">
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={LoginPageSchema}
        onSubmit={(values) => {
          setIsLoading(true);
          const { username, password } = values;
          const newValues = {
            username: username.trim(),
            password: password.trim(),
          };
          axios
            .post(
              "https://secure-recipes-backend.herokuapp.com/auth/login",
              newValues
            )
            .then((resp) => {
              setIsLoading(false);
              const token = resp.data.token;
              localStorage.setItem("token", token);
              setAuth(true);
              Navigate("/recipes");
            })
            .catch((err) => {
              console.dir(err);
              setIsLoading(false);
              const errMessage = err.response.data.error;
              setServerError(errMessage);
            });
        }}
      >
        {({ errors, touched }) => (
          <Form id="login-form" className="lr-forms">
            <section className="left-section">
              <img height="300" width="300" alt="svg" src={svg1} />
            </section>

            <section className="right-section">
              <h2>Login</h2>

              <hr />

              <div className="lr-wrap">
                <div className="lr-input-wrap">
                  <label>
                    <div className="lr-label-wrap">
                      <p className="label-title">Username:</p>
                      {errors.username && touched.username ? (
                        <p className="label-error">{errors.username}</p>
                      ) : null}
                    </div>
                    <Field
                      name="username"
                      type="text"
                      placeholder="Enter username here..."
                    />
                  </label>

                  <label>
                    <div className="lr-label-wrap">
                      <p className="label-title">Password:</p>
                      {errors.password && touched.password ? (
                        <p className="label-error">{errors.password}</p>
                      ) : null}
                    </div>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Enter password here..."
                    />
                  </label>

                  {serverError ? (
                    <p className="">Server Error: {serverError}</p>
                  ) : null}
                </div>

                <div className="lr-xtr-links">
                  <Link className="" to="/resetpassword">
                    Forgot Password?
                  </Link>
                  <Link className="" to="/register">
                    Not a User?
                  </Link>
                </div>

                <div className="lr-btn-wrap">
                  {isLoading ? (
                    <div className="loader"></div>
                  ) : (
                    <button id="log-btn" className="" type="submit">
                      Login
                    </button>
                  )}
                </div>
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default Login;
