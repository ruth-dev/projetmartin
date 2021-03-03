import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"

export default function Login(){
    let history = useHistory();

    const [email, setEmail] = useState("")
    const [lastName, setlastName] = useState("")
    const [firstName, setfirstName] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:4000/api/user/signup", {email, lastName, firstName, password}).then(data => {
            console.log(data.data)
            if(data.data == "good" && data.status == 200) history.push("/")
        })
    }
    return (
        <>
            <h1>Créer un compte</h1>
            <form onSubmit={handleRegister}>                
                <input type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <input type="text" placeholder="nom" onChange={(e)=>setlastName(e.target.value)} value={lastName}/>
                <input type="text" placeholder="prenom" onChange={(e)=>setfirstName(e.target.value)} value={firstName}/>
                <input type="password" placeholder="mot de passe" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                <input type="submit" value="S'enregistrer" />
            </form>
        </>
    )
}