import React, { createContext, useCallback, useState } from "react";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import Posts from "./components/Posts";
import NavBar from "./components/NavBar";
import SinglePost from "./components/SinglePost";
import NotFoundScreen from "./components/NotFoundScreen";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export const ThemeContext = createContext();

export default function App() {
  const [logged, setLogged] = useState(false);

  const handleLogIn = useCallback(() => {
    localStorage.setItem("authorized", "1");
    setLogged(true);
  }, []);
  const handleLogOut = useCallback(() => {
    localStorage.setItem("authorized", "0");
    setLogged(false);
  }, []);

  return (
    <ThemeContext.Provider value={{ logged, handleLogIn, handleLogOut }}>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/posts" exact>
            <Posts />
          </Route>
          <ProtectedRoute path="/posts/:id" exact children={<SinglePost />}>
            <SinglePost />
          </ProtectedRoute>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/" component={NotFoundScreen} />
        </Switch>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}
