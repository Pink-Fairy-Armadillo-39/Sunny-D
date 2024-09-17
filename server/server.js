const express = require('express');
const mongoose = require('mongoose');
const userController = require('./controllers/userController');
const path = require('path');


// Data Base
mongoose.connect('mongodb+srv://sunnyDTeam:test1234@sunnyd.gewq7u7.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

// App Router
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const api = express.Router();
app.use('/api', api);

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'))
});
}

api.get('/submit/:username', userController.getUser, (req, res)=>{
  return res.status(200).json(res.locals.data);
})

// Record Button Click Route
// Date, Points, Username
api.post('/submit', userController.updateUser, (req, res) => {
  return res.status(200).json(res.locals.totalPoints);
});

api.post('/create', userController.createUser, (req, res) => {
  return res.status(200).json(res.locals.newUser);
})

// Unknown route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
