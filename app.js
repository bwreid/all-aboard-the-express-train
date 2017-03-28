// Did you install nodemon using --save-dev?

var express = require('express')
var app = express()
var port = process.env.PORT || 3000
var trains = require('./trains')

app.get('/', index)
app.get('/ping', ping)
app.get('/trains', trainsIndex)
app.get('/trains/:index', trainsShow)
app.listen(port, listenHandler)

/////////////////////////////////////////////////////////

function index (req, res) {
  res.send('Hello World!')
}

function ping (req, res) {
  res.status(418).send('pong!')
}

function trainsIndex (req, res) {
  res.json(trains)
}

function trainsShow (req, res) {
  // What happens if we enter an index that doesn't return anything?
  var index = req.params.index
  var train = trains[index]
  res.json(train)
}

function listenHandler () {
  console.log(`Example app listening on port ${port}!`)
}

// NEXT STEPS:
// - If the index entered for the trains show route doesn't return a train,
//   send back a new status code and an error message:
//   { message: 'No train found for index 23.' }
// - Create a new delete route that removes a train from the array of trains.
//   If the index entered does not return a train, return a similar error
//   message to the one above.
