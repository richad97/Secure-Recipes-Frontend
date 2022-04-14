import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout(props) {
  const { isAuth, setAuth } = props;
  return (
    <>
      <Navbar isAuth={isAuth} setAuth={setAuth} />
      <Outlet />
    </>
  );
}
