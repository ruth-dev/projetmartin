import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Login from "./components/login/login"
import Home from "./components/home"

const routing = (
    <Router>
      <Switch>
        <Route exact path="/register" component={Login} />
        <Route component={Home} />
      </Switch>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'))