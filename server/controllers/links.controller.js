const { createLink, get, getUpVote, getDownVote, up, down } = require("../models/links")

module.exports.new = (req, res) => {
    const { id, title, content } = req.body

    createLink(id, title, content).then(async id => {    
        res.json({"status":"success"})
    })
}

module.exports.get = async (req, res) => {
    const { id } = req.params
    const link = await get(id)
    const upvote = await getUpVote(id)
    const downvote = await getDownVote(id)
    const fullLink = {
        link,
        "upvote" : Object.values(upvote),
        "downvote" : Object.values(downvote)
    }
    res.json({"status": "success", fullLink})

}

module.exports.up = async (req, res) => {
    const { id } = req.params
    const { userId } = req.body

    const vote = await up(id, userId)
    const downvote = await getDownVote(id)
    res.json({"status": "success", "vote": Object.values(vote), "downvote" : Object.values(downvote)})  
}

module.exports.down = async (req, res) => {
    const { id } = req.params
    const { userId } = req.body

    const vote = await down(id, userId)
    const upvote = await getUpVote(id)
    res.json({"status": "success", "vote": Object.values(vote), "upvote": Object.values(upvote)})  
}