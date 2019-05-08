const port = 3000;
const fs = require('fs');
const path =  require('path');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});

const csvParser = require('./csvParser');

const app = express();

app.use(express.urlencoded());
app.use(cors({origin: '*'}));
app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/static'));


const type = upload.single('file')
app.post('/csv', type, (req, res, next) => {
  const jsonInput = req.file;
  console.log('req.file', req.file)
  fs.readFile(jsonInput.path, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.json({'error': err})
      return;
    }
    const csv = csvParser(data);
    res.json({'csv': csv});
  });
  // const csv = csvParser(jsonInput);
  // fs.writeFile(__dirname + '/csv.txt', csv, (err) => {
  //   if (err) {
  //     console.log(err);
  //     res.send({'error': err});
  //     return;
  //   }
  //   res.json({'csv' : csv})
  // })
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
