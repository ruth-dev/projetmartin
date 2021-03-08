import React from "react"
import { Link } from "react-router-dom"

export default function Login(){

    return (
        <>
            <h1>Accueil</h1>
            <Link to="/signup">Créer un compte</Link><br></br>
            <Link to="/signin">Se connecter</Link>
        </>
    )
}