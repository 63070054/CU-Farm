var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

var mqtt = require('mqtt');

// Your Channel access token (long-lived) 
const CH_ACCESS_TOKEN = '';


// MQTT Topic
var mqtt_topic = '/ESP32';
const mqtt_host = 'cusensor.net'
const port = '1883'
const clientId = 'mqttx_c37a88e6'

// MQTT Host
const connectUrl = `mqtt://${host}:${port}`
// MQTT Config
var options = {
  port,
  mqtt_host,
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'nansensor',
  password: 'nan1357',
  reconnectPeriod: 1000,
};


app.use(bodyParser.json())

app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/webhook', (req, res) => {
  var text = req.body.events[0].message.text.toLowerCase()
  var sender = req.body.events[0].source.userId
  var replyToken = req.body.events[0].replyToken


  // 

  if (text === 'info' || text === 'รายงาน') {
    // Info
    inFo(sender, text)
  }
  else if (text === '1' || text === 'เปิด' || text === 'on') {
    // LED On
    ledOn(sender, text)
  }
  else if (text === '0' || text === 'ปิด' || text === 'off') {
    // LED Off
    ledOff(sender, text)
  }
  else {
    // Other
    sendText(sender, text);
  }

  res.sendStatus(200)
})

function sendText(sender, text) {
  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'กรุณาพิมพ์ : info | on | off | เปิด | ปิด เท่านั้น'
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + CH_ACCESS_TOKEN + ''
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err)
      if (res)
        if (body) 
  })
}

function inFo(sender, text) {
  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'uid: ' + sender
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + CH_ACCESS_TOKEN + ''
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err)
      if (res)
        if (body) 
  })
}


function ledOn(sender, text) {
  var client = mqtt.connect(connectUrl, options);
  client.on('connect', function () { // When connected

    // subscribe to a topic
    client.subscribe(mqtt_topic, function () {
      // when a message arrives, do something with it
      client.on('message', function (topic, message, packet) {

      });
    });


    // publish a message to a topic
    client.publish(mqtt_topic, 'on', function () {

      client.end(); // Close the connection when published
    });

  });


  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'LED ON'
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + CH_ACCESS_TOKEN + ''
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err)
      if (res)
        if (body) 
  })
}

function ledOff(sender, text) {
  var client = mqtt.connect(connectUrl, options);
  client.on('connect', function () { // When connected

    // subscribe to a topic
    client.subscribe(mqtt_topic, function () {
      // when a message arrives, do something with it
      client.on('message', function (topic, message, packet) {

      });
    });


    // publish a message to a topic
    client.publish(mqtt_topic, 'off', function () {

      client.end(); // Close the connection when published
    });

  });

  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'LED OFF'
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + CH_ACCESS_TOKEN + ''
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err)
      if (res)
        if (body) 
  })
}

app.listen(app.get('port'), function () {

})
