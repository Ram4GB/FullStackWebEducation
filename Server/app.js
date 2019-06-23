var express = require('express');
var path = require('path');
var logger = require('morgan');
var fileUpload = require('express-fileupload');
var cors = require('cors');

var indexRouter = require('./routes/index');
var studentRouter = require('./routes/students');
var excelRouter = require('./routes/excel');
var classRouter = require('./routes/classes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(cors());

app.use('/', indexRouter);
app.use('/students', studentRouter);
app.use('/excel', excelRouter);
app.use('/classes', classRouter);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
