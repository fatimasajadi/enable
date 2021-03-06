const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const usersRegister = require('./routes/register');
const usersLogin = require('./routes/login');
const workerPendingRequest = require('./routes/workerPendingRequest');
const workerPreviousSession = require('./routes/workerPreviousWork');
const familyRequest = require('./routes/familyRequest');
const listAllWorkers = require('./routes/listAllWorkers');
const statusUpdate = require('./routes/statusUpdate');
const familyPreviousRequest = require('./routes/familyPreviousRequest');
const completedRequest = require('./routes/completedRequest');
const completedAssistanceWorker = require('./routes/completedAssistanceWorker');
const listAllFamily = require('./routes/listAllFamily');
const admin = require('./routes/admin');
const deleteRequest = require('./routes/deleteRequest');
const submitPreviousRequest = require('./routes/submitPreviousRequest')

const uploadsPath = path.join(__dirname, 'statics', 'uploads');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Encrypted cookies
app.use(cookieSession({
  name: 'session',
  keys: ['f080ac7b-b838-4c5f-a1f4-b0a9fee10130', 'c3fb18be-448b-4f6e-a377-49373e9b7e1a']
}));

app.use('/', indexRouter(db));
app.use('/users', usersRouter(db));
app.use('/api/register', usersRegister(db));
app.use('/api/login', usersLogin(db));
app.use('/api/pending-requests', workerPendingRequest(db));
app.use('/api/previous-sessions', workerPreviousSession(db));
app.use('/api/my-requests', familyRequest(db));
app.use('/api/workers', listAllWorkers(db));
app.use('/api/status', statusUpdate(db));
app.use('/api/previous-assistance', familyPreviousRequest(db));
app.use('/api/completed-requests', completedRequest(db));
app.use('/api/completed-assistance', completedAssistanceWorker(db))
app.use('/api/family', listAllFamily(db));
app.use('/api/admin', admin(db));
app.use('/api/delete', deleteRequest(db));
app.use('/api/submitPreviousRequest', submitPreviousRequest(db));

// upload bill image
app.use(fileUpload());
app.use('/uploads', express.static(uploadsPath))
app.post('/upload', (req, res) => {
  if (req.files == null) {
    return res.status(400).json({ msg: 'No file was uploaded' })
  }
  const file = req.files.file;
  file.mv(`${uploadsPath}/${file.name}`, err => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
  })
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//session handling
app.use(function (req, res) {
  //req.session['user_id'] = null;
})

module.exports = app;
