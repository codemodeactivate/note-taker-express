const express = require('express');
const bodyParser = require('body-parser');
const notesAPI = require('./routes/apiRoutes');
const notesRouter = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(notesRouter);
app.use(notesAPI);



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);






module.exports = app;
