// creating notes router and exporting it
const app = require('../app');
const notes = app.Router();

// path is a node module that provides utilities for working with file and directory paths
const path = require('path');

// exporting notes router
notes.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/notes.html'))
);

// exporting index router to return index.html when no matching route is found
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
);
