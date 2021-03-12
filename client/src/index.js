import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Signup from "./components/signup/signup"
import Signin from "./components/signin/signin"
import Home from "./components/home"
import Test from "./components/test"
import axios from "axios"

const checkIsLogged = async () =>{
  const { result } = await axios.post("http://localhost:4000/api/user/checkToken", [],{withCredentials: true})
  return result
}

let isLogged;
checkIsLogged().then(data => console.log(data))


const routing = (
  <Router>
    <Switch>
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      {isLogged ? <Route exact path="/test" component={Test} /> : ""}
      <Route component={Home} />
    </Switch>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))