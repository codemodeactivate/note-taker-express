const express = require('express');

const notesAPI = require('./routes/apiRoutes');
const notes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use('/api/notes', notesAPI);
app.use('/', notes);
app.use(express.static('public'));


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);






module.exports = app;
