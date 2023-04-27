import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignUpFormPage";
import Navigation from "./components/Navigation";
import Listings from './components/Listings/Listings';


function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
      <Route path="/">
        <Navigation />
        <Listings></Listings>
      </Route>
    </Switch>
  );
}

export default App;
