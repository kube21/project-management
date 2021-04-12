const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./config/database.config");

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(cors());

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

mongoose.set("useFindAndModify", false);

// define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Project Management Application." });
});

// Require Base routes
require('./src/router/index')(app);


// listen for requests
app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
