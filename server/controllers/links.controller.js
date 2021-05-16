const { createLink, get, up, down } = require("../models/links")

module.exports.new = (req, res) => {
    const { id, title, content } = req.body

    createLink(id, title, content).then(async id => {    
        res.json({"status":"success"})
    })
}

module.exports.get = (req, res) => {
    const { id } = req.params
    get(id).then(link => res.json({"status": "success", link}))
}

module.exports.up = (req, res) => {
    const { id } = req.params
    const { vote } = req.body

    up(id, vote).then(data => {
        res.json({"status": "success", "vote":data[0].upvote})  
    })
}

module.exports.down = (req, res) => {
    const { id } = req.params
    const { vote } = req.body

    down(id, vote).then(data => {
        res.json({"status": "success", "vote":data[0].downvote})  
    })
}