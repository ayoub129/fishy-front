import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import Customers from "./pages/Customers";
import Boats from "./pages/Boats";
import Profile from "./pages/Profile";
import Sales from "./pages/Sales";
import Users from "./pages/Users";

const App = () => {
  return (
    <Router>
      <Route exact path="/">
        <Login></Login>
      </Route>
      <Route path="/boats">
        <Boats />
      </Route>
      <Route path="/customers">
        <Customers />
      </Route>
      <Route path="/users">
        <Users />
      </Route>
      <Route path="/Sales">
        <Sales />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
    </Router>
  );
};

export default App;
