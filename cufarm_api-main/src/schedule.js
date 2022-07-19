var cron = require('node-cron');
var mqtt = require('mqtt')
cron.schedule('* * * * *', async function schedulerMqtt() {

    /**
     * 1. get device
     * 2. get relay
     * 3. loop relay of each relay is 1 or 0 
     *  3.1 relay mode 0 or 1 
*       3.2 if 0 return 0
*       3.3 if 1 check period and criteria and return 0 or 1
            3.3.1 check current time is between period
            3.3.2 check criteria [sensor, condtion]
                a. get sensor value
                b. convert criteria to condition code
                c. return criteria result
            3.3.3 return with and operation
        3.4 make format for mqtt
            3.4.1 
    4. make mqtt data format
    5. send mqtt
     */

    const relays = await getListRelays()
    //
    const resultListRelayBinary = relays.map(async (relay) => {
        if (relay.mode === 0) {
            // Info
            return '0'
        }
        else if (relay.mode === 1) {
            const relayAutos = await getListRelayAuto(relay.device_id, relay.relay_id)

            const resultRelayAuto = relayAutos.map((relayAuto) => {

                var compareDate = moment();
                var startDate = moment(relayAuto.from_time).set({ 'year': moment().get('year'), 'month': moment().get('month'), 'date': moment().get('date') });

                var endDate = moment(relayAuto.to_time).set({ 'year': moment().get('year'), 'month': moment().get('month'), 'date': moment().get('date') });

                const isBetweenPeriod = compareDate.isBetween(startDate, endDate);

                const isUnderCriteria = await checkCriteria(relayAuto.criteria, relayAuto.device_id);

                if (isUnderCriteria && isBetweenPeriod) {
                    return true
                } else {
                    return false
                }
            })

            const result = resultRelayAuto.reduce((previous, current) => current && previous)

            return result ? '1' : '0'
        }
    })

    const resultRelayBinary = parseInt(resultListRelayBinary.join(''))

    sendMqttCMD(resultRelayBinary)

});
const query = (sql) => {
    return new Promise((resolve, reject) => {
        dbConn.query(sql, (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

async function getListRelays() {

    const result = await query('SELECT * from relay')
    // 
    return result
}

async function checkCriteria(criteria, device_id) {
    const [sensorName, compare, conditionValue] = criteria.slice(' ')
    const sensorValue = await client.query(
        `SELECT ${sensorName} from iotdata where deviceid='${device_id}' limit 1`)
    if (compare === '10') {
        return sensorValue > conditionValue
    }
    else {
        sensorValue <= conditionValue
    }
}


async function getListRelayAuto(devideId, relayId) {
    const result = await query(`SELECT * from relay_auto where device_id = ${deviceId}`,)
    return result
}

// async function getListRelayAuto(devideId, relayId) {
//     const result = await query(`SELECT * from relay_auto where device_id = ${deviceId}`,)
//     return result
// }

var mqtt_topic = 'CU-IoT/240AC4585A10/command'
var mqtt_topic_status = 'CU-IoT/240AC4585A10/status'
const mqtt_host = 'cusensor.net'
const port = '1883'
const clientId = 'mqttx_c37a88e6'

// MQTT Host
const connectUrl = `mqtt://${mqtt_host}:${port}`
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
}

function sendMqttCMD(resultRelayBinary) {
    var client = mqtt.connect(connectUrl, options)
    var binary = resultRelayBinary
    var digit = parseInt(binary, 2)
    client.on('connect', function () {
        // When connected

        // subscribe to a topic
        client.subscribe(mqtt_topic_status, function () {
            // when a message arrives, do something with it
            client.on('message', function (topic, message, packet) {

                if (message.length != 0) {
                    res.send({ data: message.toString() })
                    client.end()
                }
            })
        })
        client.publish(mqtt_topic, JSON.stringify({ switch: digit }), function () {

            //client.end(); // Close the connection when published
        })
    })

}



