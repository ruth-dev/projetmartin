import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Signup from "./components/signup/signup"
import Signin from "./components/signin/signin"
import Home from "./components/home"

const routing = (
    <Router>
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route component={Home} />
      </Switch>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'))