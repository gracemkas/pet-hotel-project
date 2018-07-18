const express = require('express');
const bodyParser = require('body-parser');
// const crewRouter = require('./routes/crew.router');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static('server/public'));

app.use(bodyParser.json());

// app.use('/crew', crewRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});