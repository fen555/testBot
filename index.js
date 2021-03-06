var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()
var text
var token = 'EAAQleJ8nsF0BAAFegJGRsDRagoqR1VulqakJ81DfRz2ZCZBpnhgfCiJ2hPHtS1uO5ZCENvKvIBf3gL6bRd18CwRApjbH4AD6upWoHaN17ygqZCBfeIYZCZCD5hVIfv2eGCZBtJOaobKkJ3xgZBrefbqfAXATl3DstYbDt0V4TNVDngZDZD'

app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === '1234') {
    res.send(req.query['hub.challenge'])
  }
  res.send('Error, wrong validation token')
})

app.post('/webhook/', function (req, res) {
  var messaging_events = req.body.entry[0].messaging
  for (var i = 0; i < messaging_events.length; i++) {
    var event = req.body.entry[0].messaging[i]
    var sender = event.sender.id
    if (event.message && event.message.text) {
      text = event.message.text
      // Handle a text message from this sender
      console.log(text)


    }
  }
  res.sendStatus(200)
})

app.set('port', (process.env.PORT || 5000))

app.listen(app.get('port'), function () {
  console.log('Example app listening on port ' + app.get('port') + '!')
})
