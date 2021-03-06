const express = require('express');
const mongo = require('./db/mongo');
const path = require('path');

const createError = require('http-errors');

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const moviesRouter = require('./routes/movies')

const app = express();

app.all('*', function (req, res, next) {
  if (!req.get('Origin')) return next();
  res.set('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,x-auth-token');
  next();
});

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port", this.address().port, app.settings.env);
});
