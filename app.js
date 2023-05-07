const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from the public folder
app.use(express.static('public'));

// Require the htmlroutes and apiroutes files and use them as middleware

app.use('/', htmlRoutes);
app.use('/', apiRoutes);


// exporting index router to return index.html when no matching route is found
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
);

// Start the server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));





module.exports = app;
