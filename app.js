// Did you install nodemon using --save-dev?

var express = require('express')
var app = express()
var port = process.env.PORT || 3000
var trains = require('./trains')

app.get('/', index)
app.get('/ping', ping)
app.get('/trains', trainsIndex)
app.get('/trains/:index', trainsShow)
app.delete('/trains/:index', trainsDestroy)
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
  var index = req.params.index
  var train = trains[index]

  if (train) {
    res.json(train)
  } else {
    res.status(404).json({ message: `No train found for index ${index}.` })
  }
}

function trainsDestroy (req, res) {
  var index = req.params.index
  var train = trains[index]

  if (train) {
    trains.splice(index, 1)
    res.json(train)
  } else {
    res.status(404).json({ message: `No train found for index ${index}.` })
  }
}

function listenHandler () {
  console.log(`Example app listening on port ${port}!`)
}

// NEXT STEPS:
// - We now have some similar code. We are looking to see if the train exists
//   in the same way and we are responding to an error the same way. We can
//   refactor this code with middleware.
