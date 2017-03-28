var express = require('express')
var app = express()
var port = process.env.PORT || 3000

app.get('/', function (req, res) {
  // What status code gets sent by default?
  res.send('Hello World!')
})

app.get('/ping', function (req, res) {
  res.send('pong!')
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})

// NEXT STEPS:
// - Let's name all of the functions we're using as arguments and separate them
// - Respond with a different status code on the '/ping' route
