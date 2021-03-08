import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"

export default function Signin(){
    let history = useHistory();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:4000/api/user/signin", {email, password}, {withCredentials: true}).then(data => {
            console.log(data.data)
            if(data.data == "good" && data.status == 200) history.push("/")
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