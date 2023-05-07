const router = require('express').Router();
const fs = require('fs');
// bodyParser parses incoming requests
const bodyParser = require('body-parser');
// uuid creates unique ids
const path = require('path');
const { v4: uuidv4 } = require('uuid');


//creating get api /api/notes to read db.json and return all saved notes as JSON
router.get('/api/notes', (req, res) => {
    // read the contents of the db.json file
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to read data from file' });
      }
      // parse the contents of the file into an array of objects
      const notes = JSON.parse(data);
      // send the notes array as the response
      res.json(notes);
    });
  });







router.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    const id = uuidv4();
    const newNote = { id, title, text };
    const readStream = fs.createReadStream('./db/db.json', 'utf8');
    let data = '';
    readStream.on('data', (chunk) => {
        data += chunk;
    });
    readStream.on('end', () => {
        const notes = JSON.parse(data);
        notes.push(newNote);
        const writeStream = fs.createWriteStream('./db/db.json', 'utf8');
        writeStream.write(JSON.stringify(notes));
        writeStream.end();
        writeStream.on('finish', () => {
            res.json(newNote);
        });
    });
});


module.exports = router;
