require('dotenv').config();

const Influx = require('influx');
const client = new Influx.InfluxDB({
  database: 'iotdata',
  host: '209.15.97.183',
  port: 8086,
  username: 'cuiot',
  password: 'cu!23123',
})

runQryRelay = async () => {
  try {
    const result = await client.query(`SELECT * from relay`);

  } catch (err) {

  }
}

runQryIotData = async () => {
  try {
    const result = await client.query(`SELECT * from iotdata`);

  } catch (err) {

  }
}


runQryIotData()