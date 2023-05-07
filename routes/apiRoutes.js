const router = require("express").Router();
const fs = require("fs");
// bodyParser parses incoming requests
const bodyParser = require("body-parser");
// uuid creates unique ids
const path = require("path");
const { v4: uuidv4 } = require("uuid");

//creating get api /api/notes to read db.json and return all saved notes as JSON
router.get("/api/notes", (req, res) => {
    // read the contents of the db.json file
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res
                .status(500)
                .json({ error: "Failed to read data from file" });
        }
        // parse the contents of the file into an array of objects
        const notes = JSON.parse(data);
        // send the notes array as the response
        res.json(notes);
    });
});

//post notes by deconstructing json and then reading the db.json file and adding the new note to the array and then writing the new array to the db.json file
router.post("/api/notes", (req, res) => {
    const { title, text } = req.body;
    const id = uuidv4();
    const newNote = { id, title, text };
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error" });
        }
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(notes), "utf8", (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Server error" });
            }
            res.json(newNote);
        });
    });
});

//delete notes by reading the db.json file and then filtering out the note with the id that matches the id of the note to be deleted and then writing the new array to the db.json file
router.delete("/api/notes/:id", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error" });
        }
        let notes = JSON.parse(data);
        notes = notes.filter((note) => note.id !== req.params.id);
        fs.writeFile("./db/db.json", JSON.stringify(notes), "utf8", (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Server error" });
            }
            res.json({ message: "Note deleted successfully" });
        });
    });
});

module.exports = router;
