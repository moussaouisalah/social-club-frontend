import React from "react";
import "./app.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/sign-up/SignUp";
import Index from "./pages/home/Index";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Index />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
