const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const hotelRouter = require('./routes/hotel.router');


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(express.static('server/public'));

app.use('/hotel', hotelRouter);

//spin up server
app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`)
});