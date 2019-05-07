const express = require('express');
const app = express();

const port = 3000;

app.use(express.static(__dirname + '/static'));

app.post('/csv', (req, res, next) => {
  console.log(req.body);
  res.json({'csv' : 'hello'});
})

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Express is running on port ${port}`);
})
