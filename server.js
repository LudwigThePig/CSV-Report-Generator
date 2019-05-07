const port = 3000;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const csvParser = require('./csvParser');
const fs = require('fs');
const path =  require('path');

const app = express();

app.use(cors({origin: '*'}));
app.use(bodyParser());

app.use(express.static(__dirname + '/static'));

app.post('/csv', (req, res, next) => {
  const jsonInput = req.body;
  const csv = csvParser(jsonInput);
  fs.writeFile(__dirname + '/csv.txt', csv, (err) => {
    if (err) {
      console.log(err);
      res.send({'message': err});
      return;
    }
    res.json({'csv' : csv})
  })
});

app.get('/download', (req, res, next) => {
  console.log('request received')
  res.download(__dirname + '/csv.txt');
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Express is running on port ${port}`);
})
