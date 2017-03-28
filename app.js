// Did you install nodemon using --save-dev?

var express = require('express')
var app = express()
var port = process.env.PORT || 3000

app.get('/', index)
app.get('/ping', ping)
app.listen(port, listenHandler)

/////////////////////////////////////////////////////////

function index (req, res) {
  res.send('Hello World!')
}

function ping (req, res) {
  res.status(418).send('pong!')
}

function listenHandler () {
  console.log(`Example app listening on port ${port}!`)
}

// NEXT STEPS:
// - Let's make a new resource called trains. Create a new file, `trains.js`,
//   that exports an array. Input at least two trains (as objects) that have at
//   least the following keys: name, number_of_cars, color
// - Require the resource into this file.
// - Create a new route that retrieves all the trains.
