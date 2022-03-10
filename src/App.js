import CreateRecipePage from "./pages/CreateRecipePage";
import EditRecipePage from "./pages/EditRecipePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RecipesPage from "./pages/RecipesPage";
import FriendsPage from "./pages/FriendsPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ConfirmEmailPage from "./pages/ConfirmEmailPage";
import ConfirmEmailFinalPage from "./pages/ConfirmEmailFinalPage";
import Layout from "./components/layout/Layout";
import { Navigate, Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import RequireAuth from "./components/RequireAuth";
import { RecipeContext } from "./RecipeContext";
import DeleteMessage from "./components/DeleteMessage";
import ResetPasswordFinal from "./pages/ResetPasswordFinalPage";

function App() {
  const [isAuth, setAuth] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDeleteMessage, setDeleteMessage] = useState();
  const [isDeleted, setDeleted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, []);

  return (
    <>
      <RecipeContext.Provider value={{ selectedRecipe, setSelectedRecipe }}>
        {showDeleteMessage ? (
          <DeleteMessage
            isDeleted={isDeleted}
            setDeleted={setDeleted}
            setDeleteMessage={setDeleteMessage}
          />
        ) : null}
        <Routes>
          <Route
            path="/"
            element={<Layout isAuth={isAuth} setAuth={setAuth} />}
          >
            <Route index element={<HomePage />} />
            <Route
              path="/recipes"
              element={
                <RequireAuth redirectTo={"/login"}>
                  <RecipesPage
                    isDeleted={isDeleted}
                    setDeleteMessage={setDeleteMessage}
                  />
                </RequireAuth>
              }
            />
            <Route
              path="/recipes/create"
              element={
                <RequireAuth redirectTo={"/login"}>
                  <CreateRecipePage />
                </RequireAuth>
              }
            />
            <Route
              path="/recipes/edit/:id"
              element={
                <RequireAuth redirectTo={"/login"}>
                  <EditRecipePage />
                </RequireAuth>
              }
            />
            <Route
              path="/friends"
              element={
                <RequireAuth redirectTo={"/login"}>
                  <FriendsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/login"
              element={<LoginPage isAuth={isAuth} setAuth={setAuth} />}
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/resetpassword" element={<ResetPasswordPage />} />
            <Route
              path="/resetpassword/:token"
              element={<ResetPasswordFinal />}
            />
            <Route path="/confirmation" element={<ConfirmEmailPage />} />
            <Route
              path="/confirmation/:token"
              element={<ConfirmEmailFinalPage />}
            />
            <Route
              path="*"
              element={<Navigate to={isAuth ? "/recipes" : "/login"} />}
            />
          </Route>
        </Routes>
      </RecipeContext.Provider>
    </>
  );
}

export default App;
