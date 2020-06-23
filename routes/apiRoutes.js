const db = require("../db/db.json")
const fs = require("fs")
const uuid = require("uuid")

module.exports = function(app) {
    app.get("/api/notes", function(req,res) {
        res.send(db)
    })
    //creating and posting new note
    app.post("/api/notes", function(req, res) {
        let noteId = uuid()
        let newNote = {
            id: noteId,
            title: req.body.title,
            text: req.body.text
        }
        
        fs.readFile("./db/db.json", "utf8", function(err,data) {
            if(err) throw err
            
            const allNotes = JSON.parse(data)

            fs.writeFile("./db/db.json", JSON.stringify(allNotes,null, 2), function(err) {
                if(err) throw err
                res.send(db)
                console.log("success")
            })
        })

        app.delete('/app/notes/:id', function(req, res) {
            if (err) throw err

            const allNotes = JSON.parse(data)
            const newNotesList = allNotes.filter(note => note.id !=noteId)

            fs.writeFile("./db/db.json", JSON.stringify(newNotesList, null, 2), function(err) {
                if (err) throw err
                res.send(db)
                console.log("byebye")
            })
        })
    })
}