import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout(props) {
  const { isAuth, setAuth, setDisplayLeft, setDisplayRight } = props;
  return (
    <>
      <Navbar
        isAuth={isAuth}
        setAuth={setAuth}
        setDisplayLeft={setDisplayLeft}
        setDisplayRight={setDisplayRight}
      />
      <Outlet />
    </>
  );
}
