const mongoose = require('mongoose');

//important environmental variables from .env file
require('dotenv').config({path: 'variables.env'});

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`${err.message}`);
});

// import all models
require('./models/User');

const app = require('./app');
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {});
