const mongoose = require('mongoose');

//important environemtnal variables from .env file
require('dotenv').config({path: 'variables.env'});

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`${err.message}`);
});

const app = require('./app');
app.set('port', 3000)
app.listen(3000, () => console.log('Doggie App listening on port 3000!'))

