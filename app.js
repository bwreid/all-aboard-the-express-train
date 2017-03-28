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
// - It's annoying restarting our server. Let's install nodemon.
// - Create a script so that we only need to type `npm run dev`
