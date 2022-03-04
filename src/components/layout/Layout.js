import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout(props) {
  return (
    <>
      <Navbar isAuth={props.isAuth} setAuth={props.setAuth} />
      <Outlet />
    </>
  );
}
