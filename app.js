var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 3000
var trains = require('./trains')

app.use(bodyParser.json())
app.get('/', index)
app.get('/ping', ping)
app.get('/trains', filterTrains, trainsIndex)
app.get('/trains/:index', retrieveTrain, trainsShow)
app.post('/trains', trainsCreate)
app.delete('/trains/:index', retrieveTrain, trainsDestroy)
app.use(errorHandler)
app.listen(port, listenHandler)

/////////////////////////////////////////////////////////

function index (req, res) {
  res.send('Hello World!')
}

function ping (req, res) {
  res.status(418).send('pong!')
}

function trainsIndex (req, res) {
  res.json(req.trains)
}

function filterTrains (req, res, next) {
  var num = parseInt(req.query.number_of_cars)
  if (num) {
    req.trains = trains.filter(train => train.number_of_cars === num)
  } else {
    req.trains = trains
  }

  next()
}

function trainsShow (req, res) {
  res.json(req.train)
}

function trainsDestroy (req, res) {
  trains.splice(req.params.index, 1)
  res.json(req.train)
}

function retrieveTrain (req, res, next) {
  var index = req.params.index
  var train = trains[index]
  var error = { status: 404, message: `No train found for index ${index}.` }

  req.train = train
  req.train ? next() : next(error)
}

function trainsCreate (req, res) {
  var train = req.body
  train.number_of_cars = parseInt(train.number_of_cars)
  trains.push(train)
  res.status(201).json(train)
}

function errorHandler (err, req, res, next) {
  res.status(err.status).json(err)
}

function listenHandler () {
  console.log(`Example app listening on port ${port}!`)
}

// NEXT STEPS:
// - What if your user enters information that is not allowed? For example:
//   POST { name: 'Allen', role: 'Professional Troll' }
//   Add validation to your POST route so that a user can only POST keys
//   that you want to allow.
// - You have all the tools you need to make a PUT route. Create a PUT route
//   that allows you to update an existing train. If the index provided does
//   not return a train, throw an error just like before.
