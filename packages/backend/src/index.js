const express = require('express');
require('dotenv').config();

const app = express();

const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

mongoose.connect(process.env.DATABASE_CONNECTION_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
});

app.use(require('./routes'));

server.listen(process.env.PORT || 3333);
