const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const db = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);
//console.log(db);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  //  useUnifiedTopology: true
  })
  .then(() => {
    // console.log(con.connection);
    // eslint-disable-next-line no-console
    console.log('db connection succesful');
  });

//console.log(process.env);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('server is online');
});
