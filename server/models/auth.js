const con = require("./db")

module.exports.createUser = (firstName, lastName, email, password) => {
    return new Promise(resolve => {
        con.query(`INSERT INTO users (firstname, lastName, email, password) VALUES (?, ?, ?, ?)`,[firstName, lastName,email,password], (err, result)=>{
            return resolve(true)
        })
    })
}