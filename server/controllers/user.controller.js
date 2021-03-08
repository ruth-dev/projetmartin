const bcrypt = require("bcrypt")
const { createUser, getPassword, getUser } = require("../models/auth")
const jwt = require("jsonwebtoken")

module.exports.signup = async (req, res) => {
    const { email, lastName, firstName, password } = req.body

    if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) return res.status(200).send("canceled")

    const hash = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, hash)

    createUser(firstName, lastName, email, hashedPass).then(id => {    
        const token = jwt.sign({"id":id}, process.env.TOKEN_SECRET)
        res.cookie("authToken", token, {httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 3600000)}).json({token, "status": "success"})
    })
}

module.exports.signin = async (req, res) => {
    const { email, password} = req.body;

    const hashedPass = await getPassword(email)

    if(hashedPass.length <= 0) return res.status(200).json({"status":"Email doesn't exist"})

    const isValid = await bcrypt.compare(password, hashedPass[0].password)

    switch(isValid){
        case true:
            const user = await getUser(email)
            const token = jwt.sign({user}, process.env.TOKEN_SECRET)

            res.cookie("authToken", token, {httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 3600000)}).json({token, "status": "success"})
        break;
        case false:
            res.json({"status": "wrong password"})
        break;
    }
}