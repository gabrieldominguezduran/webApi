const express = require("express");
const app = express();
const bodyParser = require('body-parser')
// const mongoose = require('mongoose')


const clientRoutes = require("./api/routes/clients");
const policiesRoutes = require("./api/routes/policies");

// // Models
// const Clients =require("./api/models/clientModel")
// const Policies = require("./api/models/policieModel")

// const db = mongoose.connection;
// // DB connection
// if(!db)
//     console.log("Error connecting db")
// else
//     console.log("Db connected successfully")

// Routes
app.use("/clients", clientRoutes);
app.use("/policies", policiesRoutes);

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Error handler
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
