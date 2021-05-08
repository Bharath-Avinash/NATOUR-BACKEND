const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('./../models/tourmodels');

dotenv.config({ path: './config.env' });
//const app = require('./app');
const tour = JSON.parse(fs.readFileSync(`${__dirname}/data/tours-simple.json`));

const db = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);
//console.log(db);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    // console.log(con.connection);
    // eslint-disable-next-line no-console
    console.log('db connection succesful');
  });
const importData = async () => {
  try {
    await Tour.create(tour);
    console.log('data loaded succesful');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data deleted succesful');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
