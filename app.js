/*
  Start by going to the expressjs.com website and find the "Hello World" example. Get your server started using it!
*/

// What type of thing is `require`?
var express = require('express')
// What type of thing is `express`?
var app = express()

// What type of thing is `app`? What about `.get`?
app.get('/', function (req, res) {
  // `res.send` is similar to something we learned yesterday. What is it?
  res.send('Hello World!')
})

// Change the port to a new one and restart your server.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// NEXT STEPS: 
// - Add a new `get` route called '/ping' that responds with 'pong!'
// - Change the port to be 3000 by default or respond to an env variable
