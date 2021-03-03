import React from "react"
import { Link } from "react-router-dom"

export default function Login(){

    return (
        <>
            <h1>Accueil</h1>
            <Link to="/register">Créer un compte</Link><br></br>
            <Link to="/login">Se connecter</Link>
        </>
    )
}