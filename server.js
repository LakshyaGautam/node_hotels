const express = require("express");
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to our hotel ...')
})

const personRoutes = require('./routes/PersonRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

app.listen(PORT, ()=>{
    console.log('server is listening to port 3000');
})