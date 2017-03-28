var express = require('express')
var app = express()
var port = process.env.PORT || 3000
var trains = require('./trains')

app.get('/', index)
app.get('/ping', ping)
app.get('/trains', filterTrains, trainsIndex)
app.get('/trains/:index', retrieveTrain, trainsShow)
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
  trains.splice(index, 1)
  res.json(req.train)
}

function retrieveTrain (req, res, next) {
  var index = req.params.index
  var train = trains[index]
  var error = { status: 404, message: `No train found for index ${index}.` }

  req.train = train
  req.train ? next() : next(error)
}

function errorHandler (err, req, res, next) {
  res.status(err.status).json(err)
}

function listenHandler () {
  console.log(`Example app listening on port ${port}!`)
}

// NEXT STEPS:
// - How can we POST to our API? This one is pretty tricky and requires
//   us to use some native Node methods:
//   req.on('data', callback)
//      .on('end', callback)
