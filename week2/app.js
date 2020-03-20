'use strict';
const express = require('express');
const app = express();
const port = 3000;

app.get('/cat/:id?', (req, res) => {
  const catID = req.params.id;
  res.send('You requested a cat whose id is ' + catID);
});

app.post('/cat', (req, res) => {
  res.send('With this endpoint you can add cats.');
});

app.put('/cat', (req, res) => {
  res.send('With this endpoint you can edit cats.');
});

app.delete('/cat', (req, res) => {
  res.send('With this endpoint you can delete cats');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
