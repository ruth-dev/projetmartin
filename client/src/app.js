import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom"
import axios from "axios"

// Components
import Signup from "./components/signup/signup"
import Index from "./components/indexpage/indexpage"
import Home from "./components/home"  
import errorPage from "./components/errors/404"

// Context
import AuthContext from "./context/authContext"
  
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={(props) => (
      auth === true
          ? <Component {...props} />
          : <Redirect to='/' />
  )} />
)

export default function App (){
  const [isLogged, setIsLogged] = useState()
  let [user, setUser] = useState({})

  useEffect(() => {
    axios.post("http://localhost:4000/api/user/checkToken", [], {withCredentials:true}).then(res => {
      if(res.data.status === "success" && res.status === 200){
        setUser(res.data.user)
      }
      setIsLogged(res.data.status === "success" ? true : false)
    })
  }, [])

  const AuthOptions = {
    isLogged,
    updateIsLogged: setIsLogged,
    updateUserInfo: setUser,
    user
  }

  if(isLogged === undefined ) return (<></>)

  return(
    <>
      <AuthContext.Provider value={AuthOptions}>
        <Router>
          <Switch>
            <PrivateRoute path="/signup" component={Signup} auth={!isLogged} />
            <Route exact path="/" component={isLogged === true ? Home : Index} />
            <Route component={errorPage} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </>
  )
}