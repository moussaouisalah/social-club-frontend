import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/sign-up/SignUp";
import Index from "./pages/home/Index";
import { userProvider } from "./providers/data-providers/userProvider";

function App() {
  userProvider.getList().then((data) => {
    console.log(data);
  });
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
