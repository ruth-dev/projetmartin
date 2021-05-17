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
            return resolve(result[0])
        })
    })
}

module.exports.getUpVote = (id) =>{
    return new Promise(resolve =>{
        con.query(`SELECT COUNT(*) FROM votes WHERE linkId = ? AND vote = 1`, [id], (err, result)=>{
            return resolve(result[0])
        })
    })
}

module.exports.getDownVote = (id) =>{
    return new Promise(resolve =>{
        con.query(`SELECT COUNT(*) FROM votes WHERE linkId = ? AND vote = 0`, [id], (err, result)=>{
            return resolve(result[0])
        })
    })
}

module.exports.up = (id, userId) =>{
    return new Promise(resolve =>{
        con.query(`SELECT * FROM votes WHERE linkId = ? AND userId = ?`, [id, userId], (err, result)=>{
            if(result.length > 0){
                if(result[0].vote === 1){
                    con.query(`DELETE FROM votes WHERE linkId = ? AND userId = ?`, [id, userId])
                    con.query(`SELECT COUNT(*) FROM votes WHERE linkId = ? AND vote = 1`, [id], (err, result)=>{
                        return resolve(result[0])
                    })
                }else if(result[0].vote === 0){
                    con.query(`UPDATE votes SET vote = 1 WHERE linkId = ? AND userId = ?`, [id, userId])
                    con.query(`SELECT COUNT(*) FROM votes WHERE linkId = ? AND vote = 1`, [id], (err, result)=>{
                        return resolve(result[0])
                    })
                }
            }else{
                con.query(`INSERT INTO votes (linkId, userId, vote) VALUES (?, ?, 1)`, [id, userId])
                con.query(`SELECT COUNT(*) FROM votes WHERE linkId = ? AND vote = 1`, [id], (err, result)=>{
                    return resolve(result[0])
                })
            }
        })
    })
}

module.exports.down = (id, userId) =>{
    return new Promise(resolve =>{
        con.query(`SELECT * FROM votes WHERE linkId = ? AND userId = ?`, [id, userId], (err, result)=>{
            if(result.length > 0){
                if(result[0].vote === 0){
                    con.query(`DELETE FROM votes WHERE linkId = ? AND userId = ?`, [id, userId])
                    con.query(`SELECT COUNT(*) FROM votes WHERE linkId = ? AND vote = 0`, [id], (err, result)=>{
                        return resolve(result[0])
                    })
                }else if(result[0].vote === 1){
                    con.query(`UPDATE votes SET vote = 0 WHERE linkId = ? AND userId = ?`, [id, userId])
                    con.query(`SELECT COUNT(*) FROM votes WHERE linkId = ? AND vote = 0`, [id], (err, result)=>{
                        return resolve(result[0])
                    })
                }
            }else{
                con.query(`INSERT INTO votes (linkId, userId, vote) VALUES (?, ?, 0)`, [id, userId])
                con.query(`SELECT COUNT(*) FROM votes WHERE linkId = ? AND vote = 0`, [id], (err, result)=>{
                    return resolve(result[0])
                })
            }
        })
    })
}