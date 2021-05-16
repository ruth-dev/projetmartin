import React, { useState, useContext } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import AuthContext from "../../context/authContext"
import "./indexpage.css"

export default function Signin(){
    let history = useHistory()

    const {updateIsLogged, updateUserInfo} = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:4000/api/user/signin", {email, password}, {withCredentials: true}).then(res => {
            if(res.data.status == "success" && res.status == 200) {
                updateIsLogged(true)
                updateUserInfo(res.data.user[0])
                history.push("/")
            }
        })
    }
    return (
        <>
            <div className="signin">
                <div className="signinContainer">
                    <form onSubmit={handleRegister}>
                        <div>
                            <div className="inputContainer">
                                <input type="text" onChange={(e)=>setEmail(e.target.value)} value={email} id="email" required/>
                                <label htmlFor="email">Adresse e-mail</label>
                                <div className="bar" />
                            </div>
                            <div className="inputContainer">
                                <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} id="password" required/>
                                <label htmlFor="password">Mot de passe</label>
                                <div className="bar"></div>
                            </div>
                            <input type="submit" value="Se connecter" />
                        </div>
                    </form>
                    <div className="btnSignup">Pas encore inscrit ? <a href="http://localhost:3000/signup">S'inscrire</a></div>
                </div>
            </div>
        </>
    )
}