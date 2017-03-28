var express = require('express')
var app = express()
var port = process.env.PORT || 3000
var trains = require('./trains')

app.get('/', index)
app.get('/ping', ping)
app.get('/trains', filterTrains, trainsIndex)
app.get('/trains/:index', retrieveTrain, trainsShow)
app.post('/trains', parseBody, trainsCreate)
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

function parseBody (req, res, next) {
  var body = []
  req.on('data', function (data) {
    body.push(data)
  }).on('end', function () {
    req.body = JSON.parse(body.join(''))
    req.body.number_of_cars = parseInt(req.body.number_of_cars)
    next()
  })
}

function errorHandler (err, req, res, next) {
  res.status(err.status).json(err)
}

function listenHandler () {
  console.log(`Example app listening on port ${port}!`)
}

// NEXT STEPS:
// - This is a pretty common process, so someone's already made a package
//   to do exactly what we're doing -- only better!
// - Install `body-parser` and read the documentation on how to use it.
