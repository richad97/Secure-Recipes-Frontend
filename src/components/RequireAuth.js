import { Navigate } from "react-router-dom";

function RequireAuth({ children, redirectTo }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to={redirectTo} />;
}

export default RequireAuth;
