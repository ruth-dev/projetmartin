import React, { useState, useContext } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import AuthContext from "../../context/authContext"

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
            <h1>Se connecter</h1>
            <form onSubmit={handleRegister}>                
                <input type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <input type="password" placeholder="mot de passe" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                <input type="submit" value="S'enregistrer" />
            </form>
        </>
    )
}