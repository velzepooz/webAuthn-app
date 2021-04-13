const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const userRoutes = require('./routes/user');
const keys = require('./keys');

const app = express();
const port = process.env.PORT || 9000;

app.use(express.static('client/build'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// app.use(session({
//   secret: 'secret', // You should specify a real secret here
//   resave: true,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: false,
//     secure: false,
//   },
// }));
app.use('/api', userRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

const start = async () => {
  try {
    await mongoose.connect(keys.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Example app listening at http://localhost:${port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

start();
