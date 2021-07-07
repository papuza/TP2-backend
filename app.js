// Includes
const express = require("express"),
  app = express(),
  methodOverride = require("method-override"),
  http = require("http"),
  server = http.createServer(app),
  mongoose = require('mongoose');

// Connection to DB
mongoose.connect(
  'mongodb+srv://lauti573:4xwtDXuANUATnhBF@cluster0.utwtn.mongodb.net/gmaps?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, res) {
    try {
      console.log('Connected to Database');
    } catch (err) {
      console.log(err)
      throw err;
    }
  });

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride());
const cors = require('cors')
app.use(cors())


routes = require('./routes/markers')(app); //Incluye archivo de rutas
app.get('/', function (req, res) {
  res.send("Welcome to the machine ...");
});

//Iniciamos el servidor
server.listen(process.env.PORT || 3000, function () {
  console.log("Node server running on http://localhost:3001");
});
module.exports = app;