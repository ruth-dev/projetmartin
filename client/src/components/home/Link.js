import React, { useEffect, useState } from "react"
import axios from "axios"

export default function Link (props){
    const { id, userId } = props
    const [linkUserId, setLinkUserId] = useState()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [upVote, setUpVote] = useState()
    const [downVote, setDownVote] = useState()

    const upVotes = () =>{
        axios.post("http://localhost:4000/api/links/up/"+id, {userId}, {withCredentials:true}).then(res => {
            if(res.data.status === "success" && res.status === 200){
                setUpVote(res.data.vote)
                setDownVote(res.data.downvote)
            }
        })
    }

    const downVotes = () =>{
        axios.post("http://localhost:4000/api/links/down/"+id, {userId}, {withCredentials:true}).then(res => {
            if(res.data.status === "success" && res.status === 200){
                setDownVote(res.data.vote)
                setUpVote(res.data.upvote)
            }
        })
    }

    useEffect(()=>{
        axios.post("http://localhost:4000/api/links/get/"+id, [], {withCredentials:true}).then(res => {
            if(res.data.status === "success" && res.status === 200){
                setLinkUserId(res.data.fullLink.link.userId)
                setTitle(res.data.fullLink.link.title)
                setContent(res.data.fullLink.link.content)
                setUpVote(res.data.fullLink.upvote)
                setDownVote(res.data.fullLink.downvote)
            }
        })
    },[])

    return (
        <>
            <div className="linkContainer">
                <div className="title">{title}</div>
                <div className="content">{content}</div>
                <div className="votes">
                    <div className="up" onClick={upVotes}>
                        <i className="fas fa-thumbs-up"></i>
                        <span>{upVote}</span>
                    </div>
                    <div className="down" onClick={downVotes}>
                        <i className="fas fa-thumbs-down"></i>
                        <span>{downVote}</span>
                    </div>
                </div>
                {linkUserId === userId ?
                    <div className="paramsBtn">
                        <i class="fas fa-cog"></i>
                        <span>Supprimer</span>
                        <span>Editer</span>
                    </div>
                : ""}
            </div>
        </>
    )
}