const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const userRoutes = require('./routes/user');

const app = express();
const port = process.env.PORT || 9000;

app.use(express.static('client/build'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret', // You should specify a real secret here
  resave: true,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    secure: false,
  },
}));
app.use(userRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

const start = async() => {
  try {
    // eslint-disable-next-line max-len
    const url = 'mongodb+srv://gleb:Q2V5yJL4wksL7VT@cluster0.6uxeu.mongodb.net/users';

    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Example app listening at http://localhost:${port}`);
    });

    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

start();
