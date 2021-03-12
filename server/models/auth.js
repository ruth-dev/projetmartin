const con = require("./db")

/**
 * Create new user and return id
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} email 
 * @param {string} password 
 */
module.exports.createUser = (firstName, lastName, email, password) => {
    return new Promise(resolve => {
        con.query(`INSERT INTO users (firstname, lastName, email, password) VALUES (?, ?, ?, ?)`,[firstName, lastName,email,password], (err, result) => {
            return resolve(result.insertId)
        })
    })
}

/**
 * Return user password
 * @param {string} email 
 */
module.exports.getPassword = (email) => {
    return new Promise(resolve => {
        con.query(`SELECT password FROM users WHERE email = ?`, email, (err, result) => {
            return resolve(result)
        })
    })
}

/**
 * Return all user info without password
 * @param {string} email 
 */
module.exports.getUser = (email) => {
    return new Promise(resolve => {
        con.query(`SELECT id, lastName, firstName, email FROM users WHERE email = ?`, email, (err, result) => {
            return resolve(result)
        })
    }) 
}

/**
 * Check if email is already used
 * @param {string} email 
 */
module.exports.checkEmailExist = (email) => {
    return new Promise(resolve => {
        con.query(`SELECT * FROM users WHERE email = ?`, email, (err, result) => {
            if(result.length <= 0){
                resolve(true)
            }else{
                resolve(false)
            }
        })
    })
}