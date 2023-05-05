// creating notes router and exporting it
const express = require('express');
const router = express.Router();
// path is a node module that provides utilities for working with file and directory paths
const path = require('path');


// exporting notes router
router.get('/notes/', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/notes.html'))
);

// exporting index router to return index.html when no matching route is found
router.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
);


module.exports = router;
