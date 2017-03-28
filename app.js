var express = require('express')
var app = express()
var port = process.env.PORT || 3000
var trains = require('./trains')

app.get('/', index)
app.get('/ping', ping)
app.get('/trains', trainsIndex)
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
  res.json(trains)
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

function errorHandler (err, req, res, next) {
  res.status(err.status).json(err)
}

function listenHandler () {
  console.log(`Example app listening on port ${port}!`)
}

// NEXT STEPS:
// - We've now added middleware! Middleware is an awesome feature of express
//   that we can and should rely upon heavily.
// - Before we move on to POST and PUT, let's use query parameters to refine
//   our trains index. We want the following URL to only return trains with
//   exactly 3 cars: `/trains?number_of_cars=3`
