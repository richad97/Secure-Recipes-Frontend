import { Link, useNavigate } from "react-router-dom";
import "../styles/components/authForms.css";
import "../styles/components/form.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

const LoginPageSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

function Login(props) {
  const [serverError, setServerError] = useState("");
  const { isAuth, setAuth } = props;
  const Navigate = useNavigate();

  return (
    <main id="login-main" className="auth-forms">
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={LoginPageSchema}
        onSubmit={(values) => {
          const { username, password } = values;
          const newValues = {
            username: username.trim(),
            password: password.trim(),
          };
          axios
            .post("http://localhost:9000/auth/login", newValues)
            .then((resp) => {
              const token = resp.data.token;

              localStorage.setItem("token", token);
              setAuth(true);
              Navigate("/recipes");
            })
            .catch((err) => {
              const errMessage = err.response.data.error;
              console.log(errMessage);
              setServerError(errMessage);
            });
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <h2 className="form-h2 auth-forms-h2">Login</h2>

            <hr className="auth-forms-hr" />

            <div className="auth-forms-middle-cont">
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
                  placeholder="Enter username here..."
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
                  placeholder="Enter password here..."
                />
              </label>
              {serverError ? (
                <p className="error-val">Server Error: {serverError}</p>
              ) : null}
            </div>
            <button
              id="log-btn"
              className="form-button btn-global auth-forms-btn"
              type="submit"
            >
              Login
            </button>
            <Link className="form-a auth-form-links" to="/resetpassword">
              Forgot Password?
            </Link>
            <Link className="form-a auth-form-links" to="/register">
              Not a User?
            </Link>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default Login;
