const bcrypt = require("bcrypt")
const { createUser } = require("../models/auth")
const jwt = require("jsonwebtoken")

module.exports.signup = async (req, res) => {
    const { email, lastName, firstName, password } = req.body

    if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) return res.status(200).send("canceled")

    const hash = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, hash)

    //createUser(firstName, lastName, email, hashedPass)

    const token = jwt.sign({"id":"test"}, process.env.TOKEN_SECRET)

    res.cookie("cookiename", "cookiecontent", {httpOnly: false}).json(token)
}

module.exports.signin = async (req, res) => {
    console.log(req.cookies)
    res.send("a")
}