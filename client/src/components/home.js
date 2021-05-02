import React, { useContext } from "react"
import axios from "axios"
import authContext from "../context/authContext"

export default function Home (){
    const {user} = useContext(authContext)

    const logoutHandler = () => {
        axios.post("http://localhost:4000/api/user/logout", [], {withCredentials:true}).then(res => {
            if(res.data.status === "success" && res.status === 200){
                window.location = "/"
            }
        })
    }

    return (
        <>
            <h1>Bienvenue, {user.firstName} {user.lastName} </h1>
            <button onClick={logoutHandler}>Se déconnecter</button>
        </>
    )
}