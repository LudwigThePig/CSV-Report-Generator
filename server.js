const port = 3000;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const csvParser = require('./csvParser');

const app = express();

app.use(cors({origin: '*'}));
app.use(bodyParser());

app.use(express.static(__dirname + '/static'));

app.post('/csv', (req, res, next) => {
  const jsonInput = req.body;
  const csv = csvParser(jsonInput);
  console.log('server', csv);
  res.json({'csv' : csv});
})

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Express is running on port ${port}`);
})
