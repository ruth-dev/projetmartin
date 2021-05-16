import React, { useEffect, useState } from "react"
import axios from "axios"

export default function Link (props){
    const { id } = props
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [upVote, setUpVote] = useState()
    const [downVote, setDownVote] = useState()

    const upVotes = () =>{
        axios.post("http://localhost:4000/api/links/up/"+id, {"vote": upVote}, {withCredentials:true}).then(res => {
            if(res.data.status === "success" && res.status === 200){
                setUpVote(res.data.vote)
            }
        })
    }

    const downVotes = () =>{
        axios.post("http://localhost:4000/api/links/down/"+id, {"vote": downVote}, {withCredentials:true}).then(res => {
            if(res.data.status === "success" && res.status === 200){
                setDownVote(res.data.vote)
            }
        })
    }

    useEffect(()=>{
        axios.post("http://localhost:4000/api/links/get/"+id, [], {withCredentials:true}).then(res => {
            if(res.data.status === "success" && res.status === 200){
                setTitle(res.data.link[0].title)
                setContent(res.data.link[0].content)
                setUpVote(res.data.link[0].upvote)
                setDownVote(res.data.link[0].downvote)
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
            </div>
        </>
    )
}