const express = require('express');
const notesAPI = express.Router();
const fs = require('fs');
// bodyParser parses incoming requests
const bodyParser = require('body-parser');
// uuid creates unique ids
const { v4: uuidv4 } = require('uuid');


//creating get api /api/notes to read db.json and return all saved notes as JSON
notesAPI.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
            const notes = JSON.parse(data);
            res.json(notes);
    })
});


notesAPI.use(bodyParser.urlencoded({ extended: false }));
notesAPI.use(bodyParser.json());


notesAPI.post('/api/notes', (req, res) => {
    //get new note from request body & destructure
    const { title, text } = req.body;
    //generate Unique ID using uuidv4
    const id = uuidv4();
    //create new note object with title, text, and id
    const newNote = { id, title, text };
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(newNote);
        });
    });





});

module.exports = notesAPI;
