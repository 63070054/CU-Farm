const MQTT = require("async-mqtt");

const host = 'cusensor.net'
const port = '1883'
const clientId = 'mqttx_c37a88e6'

const connectUrl = `mqtt://${host}:${port}`
const client = MQTT.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'nansensor',
  password: 'nan1357',
  reconnectPeriod: 1000,
})
client.on('reconnect', () => {

});
client.on('connect', () => {

});
client.on('error', (err) => {
  console.error('Connection error: ', err);
  client.end();
});
client.on('message', (topic, message) => {
  const payload = { topic, message: message.toString() };

});

// When passing async functions as event listeners, make sure to have a try catch block
// const topic = "CU-IoT/240AC4585A10/command"
// const doStuff = async () => {

//   
//   try {
//     const sub = await client.subscribe('CU-IoT/240AC4585A10/command', { qos: 0, retain: true })
//     
//     const bup = await client.publish("CU-IoT/240AC4585A10/command", JSON.stringify({ "get": "111"}));
//     

//     // This line doesn't run until the server responds to the publish
//     await client.end();
//     // This line doesn't run until the client has disconnected without error
//     
//   } catch (e) {
//     // Do something about it!
//     
//     process.exit();
//   }
// }

// client.on("connect", doStuff);

// run()

// async function run() {
//   const client = await MQTT.connectAsync("cusensor.net:1883")

//   
//   try {
//     await client.publish("CU-IoT/240AC4589028/command", { "get": 111 });
//     // This line doesn't run until the server responds to the publish
//     await client.end();
//     // This line doesn't run until the client has disconnected without error
//     
//   } catch (e) {
//     // Do something about it!
//     
//     process.exit();
//   }
// }