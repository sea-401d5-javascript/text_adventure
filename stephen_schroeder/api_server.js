'use strict';

const app = require('express')();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

app.listen(8080, () => console.log('up on 8080'));
