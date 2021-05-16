const bcrypt = require("bcrypt")
const { createUser, getPassword, getUser, checkEmailExist } = require("../models/auth")
const jwt = require("jsonwebtoken")

module.exports.signup = async (req, res) => {
    const { email, pseudo, password } = req.body

    if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) return res.status(200).json({"status":"error", "error":"Email not correct"})

    if(!await checkEmailExist(email)) return res.status(200).json({"status":"error", "error": "Email already exist"})

    const hash = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, hash)

    createUser(pseudo, email, hashedPass).then(async id => {    
        const user = await getUser(email)
        const token = jwt.sign({user}, process.env.TOKEN_SECRET)
        res.cookie("authToken", token, {httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 3600000)}).json({token, "status": "success", user})
    })
}

module.exports.signin = async (req, res) => {
    const { email, password} = req.body;

    const hashedPass = await getPassword(email)

    if(hashedPass.length <= 0) return res.status(200).json({"status":"error", "error":"Email doesn't exist"})

    const isValid = await bcrypt.compare(password, hashedPass[0].password)

    switch(isValid){
        case true:
            const user = await getUser(email)
            const token = jwt.sign({user}, process.env.TOKEN_SECRET)
            res.cookie("authToken", token, {httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 3600000)}).json({token, "status": "success", user})
        break;
        default:
            res.json({"status": "wrong password"})
    }
}

module.exports.logout = (req, res) => {
    res.cookie("authToken", "", {httpOnly: true, expires: 0}).status(200).json({"status": "success"})
}

module.exports.checkToken = async (req, res) => {
    const token = req.cookies.authToken
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
            if(err) res.status(400).json("Error 400!")
            const infos = jwt.decode(token)
            res.json({
                "status": "success",
                "user": infos.user[0]
            })
        })
    }
}