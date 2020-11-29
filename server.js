// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening() {
  console.log("The server is currently running.");
  console.log(`Its location is on localhost: ${port}`);
}

// HTTP Requests //
// GET Route
app.get("/all", sendData);

function sendData(request, response) {
  response.send(projectData);
  console.log("GET Request Sent");
}

// POST Route
app.post("/add", PostData);

function PostData(req, res) {
  const body = req.body;
  console.log(body);
  projectData["date"] = body.date;
  projectData["city"] = body.city;
  projectData["condition"] = body.condition;
  projectData["temp"] = body.temp;
  projectData["feelings"] = body.feelings;
  res.send(projectData);
  console.log("Added the following data", projectData);
}
