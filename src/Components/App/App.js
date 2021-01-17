import { Provider } from "jotai";
import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Bet from "../../Container/Bet/Bet";
import Home from "../../Container/Home/Home";
import SelectedItem from "../SelectetdItem/SelectedItem";
import "./App.scss";

function App(){

  return (
    <Provider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/bet">
            <Bet/>
          </Route>
        </Switch>
      </Router>
    </Provider>
    );
}

export default App;
