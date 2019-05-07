const express = require('express');
const app = express();

const port = 3000;

app.use(express.static(__dirname + '/static'));

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Express is running on port ${port}`);
})