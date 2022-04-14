import { Navigate, Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { RecipeContext } from "./RecipeContext";
import CreateRecipePage from "./pages/CreateRecipePage";
import EditRecipePage from "./pages/EditRecipePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RecipesPage from "./pages/RecipesPage";
import FriendsPage from "./pages/FriendsPage";
import AddFriendPage from "./pages/AddFriendPage";
import FriendsRecipes from "./pages/FriendsRecipesPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ConfirmEmailPage from "./pages/ConfirmEmailPage";
import ConfirmEmailFinalPage from "./pages/ConfirmEmailFinalPage";
import Layout from "./components/layout/Layout";
import RequireAuth from "./components/RequireAuth";
import DeleteMessage from "./components/DeleteMessage";
import DeleteFriendMessage from "./components/DeleteFriendMessage";
import ResetPasswordFinal from "./pages/ResetPasswordFinalPage";

function App() {
  const [isAuth, setAuth] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDeleteMessage, setDeleteMessage] = useState();
  const [friendDeleteMessage, setFriendDeleteMessage] = useState();
  const [isDeleted, setDeleted] = useState(false);
  const [friendID, setFriendID] = useState(null);
  const [change, setChange] = useState(false);
  const [usingPhone, setUsingPhone] = useState(false);
  const [showLeftSection, setLeftSection] = useState(true);
  const [showRightSection, setRightSection] = useState(true);

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
      <RecipeContext.Provider
        value={{ selectedRecipe, setSelectedRecipe, change, setChange }}
      >
        {showDeleteMessage ? (
          <DeleteMessage
            isDeleted={isDeleted}
            setDeleted={setDeleted}
            setDeleteMessage={setDeleteMessage}
          />
        ) : null}
        {friendDeleteMessage ? (
          <DeleteFriendMessage
            setFriendDeleteMessage={setFriendDeleteMessage}
            friendID={friendID}
          />
        ) : null}
        <Routes>
          <Route
            path="/"
            element={<Layout isAuth={isAuth} setAuth={setAuth} />}
          >
            <Route index element={<HomePage isAuth={isAuth} />} />
            <Route
              path="/recipes"
              element={
                <RequireAuth redirectTo={"/login"}>
                  <RecipesPage
                    isDeleted={isDeleted}
                    setDeleteMessage={setDeleteMessage}
                    usingPhone={usingPhone}
                    setUsingPhone={setUsingPhone}
                    showLeftSection={showLeftSection}
                    setLeftSection={setLeftSection}
                    showRightSection={showRightSection}
                    setRightSection={setRightSection}
                  />
                </RequireAuth>
              }
            />
            <Route
              path="/recipes/create"
              element={
                <RequireAuth redirectTo={"/login"}>
                  <CreateRecipePage
                    usingPhone={usingPhone}
                    setUsingPhone={setUsingPhone}
                    showLeftSection={showLeftSection}
                    setLeftSection={setLeftSection}
                    showRightSection={showRightSection}
                    setRightSection={setRightSection}
                  />
                </RequireAuth>
              }
            />
            <Route
              path="/recipes/edit/:id"
              element={
                <RequireAuth redirectTo={"/login"}>
                  <EditRecipePage
                    usingPhone={usingPhone}
                    setUsingPhone={setUsingPhone}
                    showLeftSection={showLeftSection}
                    setLeftSection={setLeftSection}
                    showRightSection={showRightSection}
                    setRightSection={setRightSection}
                  />
                </RequireAuth>
              }
            />
            <Route
              path="/friends"
              element={
                <RequireAuth redirectTo={"/login"}>
                  <FriendsPage
                    setFriendDeleteMessage={setFriendDeleteMessage}
                    setFriendID={setFriendID}
                  />
                </RequireAuth>
              }
            />
            <Route
              path="/addfriend"
              element={
                <RequireAuth redirectTo={"/login"}>
                  <AddFriendPage />
                </RequireAuth>
              }
            />
            <Route
              path="/recipes/:friendUsername"
              element={
                <RequireAuth redirectTo={"/login"}>
                  <FriendsRecipes
                    usingPhone={usingPhone}
                    setUsingPhone={setUsingPhone}
                    showLeftSection={showLeftSection}
                    setLeftSection={setLeftSection}
                    showRightSection={showRightSection}
                    setRightSection={setRightSection}
                  />
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
              element={<Navigate to={isAuth ? "/recipes" : "/"} />}
            />
          </Route>
        </Routes>
      </RecipeContext.Provider>
    </>
  );
}

export default App;
