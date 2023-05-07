// creating notes router and exporting it
const express = require('express');
const router = express.Router();
// path is a node module that provides utilities for working with file and directory paths
const path = require('path');
//const app = express();


//Get route for home page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

// exporting notes router
router.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/notes.html'))
);



/*router.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
);*/


module.exports = router;
