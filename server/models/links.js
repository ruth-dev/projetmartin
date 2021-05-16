const con = require("./db")

/**
 * Create new user and return id
 * @param {int} id 
 * @param {string} title 
 * @param {string} content 
 */
module.exports.createLink = (id, title, content) => {
    return new Promise(resolve => {
        con.query(`INSERT INTO links (userId, title, content) VALUES (?, ?, ?)`,[id, title, content], (err, result) => {
            return resolve(result.insertId)
        })
    })
}

/**
 * 
 * @param {int} id 
 * @returns 
 */
module.exports.get = (id) =>{
    return new Promise(resolve =>{
        con.query(`SELECT * FROM links WHERE id = ?`, [id], (err, result)=>{
            return resolve(result)
        })
    })
}

module.exports.up = (id, vote) =>{
    return new Promise(resolve =>{
        con.query(`UPDATE links SET upvote = ? WHERE id = ?`, [vote+=1, id])
        con.query(`SELECT upvote FROM links WHERE id = ?`, [id], (err, result)=>{
            return resolve(result)
        })
    })
}

module.exports.down = (id, vote) =>{
    return new Promise(resolve =>{
        con.query(`UPDATE links SET downvote = ? WHERE id = ?`, [vote-=1, id])
        con.query(`SELECT downvote FROM links WHERE id = ?`, [id], (err, result)=>{
            return resolve(result)
        })
    })
}