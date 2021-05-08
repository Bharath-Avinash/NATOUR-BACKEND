const express = require('express');

const fs = require('fs');

const morgan = require('morgan');

const tourRoutes = require('./../starter/routes/tourRoutes.js');
const userRoutes = require('./../starter/routes/userRoutes.js');

const app = express();
//console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('Hello from the middleware');
  next();
});

app.use(express.static(`${__dirname}/public/img`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // eslint-disable-next-line no-console
  console.log(req.requestTime);
  next();
});

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);
module.exports = app;
