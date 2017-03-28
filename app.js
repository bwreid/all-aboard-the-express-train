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
app.post('/trains', validateTrain, trainsCreate)
app.put('/trains/:index', retrieveTrain, validateTrain, trainsUpdate)
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
  trains.push(train)
  res.status(201).json(train)
}

function trainsUpdate (req, res) {
  trains.splice(req.params.index, 1, req.train)
  res.json(req.train)
}

function validateTrain (req, res, next) {
  var train = req.body
  var error = { status: 422, message: `Invalid train.` }

  if (!(train.name && train.color && train.number_of_cars)) next(error)

  req.train = {
    name: train.name,
    color: train.color,
    number_of_cars: parseInt(train.number_of_cars)
  }

  next()
}

function errorHandler (err, req, res, next) {
  res.status(err.status).json(err)
}

function listenHandler () {
  console.log(`Example app listening on port ${port}!`)
}

// NEXT STEPS:
// - Together, let's create a new resource called `passengers`
//   where each passenger includes a full_name, ticket_id, and date_of_purchase.
// - We're going to create the index route for passengers, reusing the code
//   from the trains index route, via a closure
