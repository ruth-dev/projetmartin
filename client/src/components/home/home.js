import React, { useContext, useState } from "react"
import axios from "axios"
import authContext from "../../context/authContext"

import Link from "./Link"
import "./home.css"

export default function Home (){
    const {user} = useContext(authContext)

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const logoutHandler = () => {
        axios.post("http://localhost:4000/api/user/logout", [], {withCredentials:true}).then(res => {
            if(res.data.status === "success" && res.status === 200){
                window.location = "/"
            }
        })
    }

    const LinkHandler = (e) =>{
        e.preventDefault()
        axios.post("http://localhost:4000/api/links/new", {"id":user.id, title, content}, {withCredentials:true}).then(res => {
            if(res.data.status === "success" && res.status === 200){
                setTitle("")
                setContent("")
            }
        })
    }

    return (
        <>
            <div className="nav">
                <button onClick={logoutHandler}>Se déconnecter</button>
                <h1>Bienvenue, {user.pseudo} </h1>
            </div>
            <div className="center">
                <div className="newLink">
                    <form onSubmit={LinkHandler}>
                        <div className="title">
                            <input type="text" placeholder="Titre du lien" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                        </div>
                        <div className="content">
                            <textarea placeholder="Contenu du lien" value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
                        </div>
                        <button type="submit">Poster</button>
                    </form>
                </div>
                <Link id={1} userId={user.id}/>
                <Link id={2} userId={user.id}/>
            </div>
        </>
    )
}