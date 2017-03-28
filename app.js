// Did you install nodemon using --save-dev?

var express = require('express')
var app = express()
var port = process.env.PORT || 3000
var trains = require('./trains')

app.get('/', index)
app.get('/ping', ping)
app.get('/trains', trainsIndex)
app.listen(port, listenHandler)

/////////////////////////////////////////////////////////

function index (req, res) {
  res.send('Hello World!')
}

function ping (req, res) {
  res.status(418).send('pong!')
}

function trainsIndex (req, res) {
  res.send(JSON.stringify(trains))
}

function listenHandler () {
  console.log(`Example app listening on port ${port}!`)
}

// NEXT STEPS:
// - Instead of sending back a string, let's respond with json
// - Create a show route so that we return a single train based on the array's
//   index. The terminology for this is "route parameters"
