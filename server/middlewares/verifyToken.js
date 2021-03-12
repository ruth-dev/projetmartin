const jwt = require("jsonwebtoken")

verifyToken = async (req, res, next) => {
    const token = req.cookies.authToken
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
            if(err){
                res.json({"status": "error", "error": "Token or signature invalid"})
            }else{
                next()
            }
        })
    }else{
        res.json({"status": "error", "error": "No cookie provided"})
    }
}

module.exports = verifyToken