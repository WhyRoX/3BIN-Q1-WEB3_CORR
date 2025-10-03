var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var expensesRouter = require('./routes/expenses.js');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// More flexible CORS configuration for Render
app.use(
  cors({
    origin: [
      'http://localhost:5173', 
      /\.onrender\.com$/,
      /localhost:\d+/  // Allow any localhost port for development
    ],
    credentials: true
  })
);

app.use('/api/expenses', expensesRouter);

module.exports = app;