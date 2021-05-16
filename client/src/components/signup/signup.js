import React, { useState, useContext } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import AuthContext from "../../context/authContext"
import "./signup.css"

export default function Signup(){
    let history = useHistory();

    const {updateIsLogged, updateUserInfo} = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [pseudo, setPseudo] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:4000/api/user/signup", {pseudo, email, password}, {withCredentials: true}).then(res => {
            if(res.data.status == "success" && res.status == 200) {
                updateIsLogged(true)
                updateUserInfo(res.data.user[0])
                history.push("/")
            }
        })
    }
    return (
        <>
            <div className="signup">
                <div className="signupContainer">
                    <form onSubmit={handleRegister}>
                        <div>
                            <div className="inputContainer">                  
                                <input type="text" onChange={(e)=>setEmail(e.target.value)} value={email} id="email" required />
                                <label htmlFor="email">Email</label>
                                <div className="bar"></div>
                            </div>
                            <div className="inputContainer">
                                <input type="text" onChange={(e)=>setPseudo(e.target.value)} value={pseudo} id="pseudo" required/>
                                <label htmlFor="email">Pseudo</label>
                                <div className="bar"></div>
                            </div>
                            <div className="inputContainer">
                                <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} id="password" required />
                                <label htmlFor="password">Mot de passe</label>
                                <div className="bar"></div>
                            </div>
                        </div>          
                        <input type="submit" value="S'inscrire" />
                    </form>
                    <div className="btnSignin">Déjà inscrit ? <a href="http://localhost:3000/">Se connecter</a></div>
                </div>
            </div>
        </>
    )
}