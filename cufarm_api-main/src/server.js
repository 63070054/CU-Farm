const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const cors = require('cors')
const { signupValidation, loginValidation } = require('./validation')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
var mqtt = require('mqtt')
const moment = require('moment');
//const mqttRequest = require('./schedule')
require('dotenv').config();
const config = require('./config/config.local.json')
const _ = require('lodash')


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


const dbConn = mysql.createConnection(config.mysql)


const router = express.Router()
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


const main = async () => {
  const result = await query(
    `SELECT * from device where device_id='${req.params.device_id}'`,
  )
}

router.get('/camera/:device_id', async (req, res, next) => {
  try {
    const result = await query(
      `SELECT * from device where device_id='${req.params.device_id}'`,
    )
    if (error) res.send({ error: true, message: error })
    res.send({ error: false, data: result[0] })
  } catch (error) {
    res.status(500).send({ error: true, message: error })
  }
})

router.post('/order', (req, res, next) => {
  dbConn.query('SELECT * from relay', (error, results) => {
    if (error) res.send({ error: true, message: error })
    res.send({ error: false, data: results })
  })
})

router.post('/model_soil', async (req, res, next) => {
  try {
    const result = await query(
      `INSERT INTO model_soil (device_id, date_model, humid) VALUES ("${req.body.device_id}","${req.body.date_model}",${req.body.humid})`,
    )
    res.send({ error: false, data: result[0] })
  } catch (error) {
    res.status(500).send({ error: true, message: error })
  }
})

router.post('/camera', async (req, res, next) => {
  buff = BytesIO()
  img_str = base64.b64encode(buff.getvalue()).decode('utf-8')
  try {
    const result = await query(
      `INSERT INTO camera (device_id, user, filename) VALUES ("${req.body.device_id}","${req.body.user}",${img_str})`,
    )
    res.send({ error: false, data: result[0] })
  } catch (error) {
    res.status(500).send({ error: true, message: error })
  }
})

router.get('/camera/:device_id', async (req, res, next) => {
  try {
    const result = await query(
      `SELECT * from device where device_id='${req.params.device_id}'`,
    )
    if (error) res.send({ error: true, message: error })
    res.send({ error: false, data: result[0] })
  } catch (error) {
    res.status(500).send({ error: true, message: error })
  }
})

router.get('/camera', (req, res, next) => {
  dbConn.query('SELECT * from camera', (error, results) => {
    if (error) res.send({ error: true, message: error })
    res.send({ error: false, data: results })
  })
})

router.get('/', (req, res, next) => {
  return res.send({ error: true, messsage: 'no route' })
})

router.get('/health', (req, res, next) => {
  return res.send({ message: `hello world` })
})


router.delete('/delete/:device_id', async (req, res, next) => {
  try {
    const result = await query(
      `DELETE FROM user_device where device_id='${req.params.device_id}'`,
    )

    res.send({ error: false, data: result.status() })
  } catch (error) {
    res.status(500).send({ error: true, message: error })
  }
})

router.delete('/deleteDevice/:device_id', async (req, res, next) => {

  try {
    const result = await query(
      `DELETE FROM device where device_id='${req.params.device_id}'`,
    )
    res.send({ error: false, data: result.status() })
  } catch (error) {
    res.status(500).send({ error: true, message: error })
  }
})

router.post('/device/:device_id', async (req, res, next) => {
  try {

    const result = await query(
      `SELECT * from device where device_id='${req.params.device_id}'`,
    )

    const relay = await query(
      `SELECT * from relay where device_id='${req.params.device_id}'`,
    )

    // const sensor = await client.query(
    //   `SELECT * from iotdata where deviceid='${req.params.device_id}' limit 1`,
    // )
    const sensor = await query(
      `SELECT * from sensor where device_id='${req.params.device_id}'`,
    )

    const id = uuidv4()
    if (result.length <= 0) {
      return res.status(404).send({ message: 'device not found!' })
    }
    await query(
      `INSERT INTO user_device (usasdaser, device_id, device_name, abstract, sleepTime1, sleepHours1) VALUES ("${req.body.user}","${req.params.device_id}","${result[0].name}", "${result[0].abstract}",${result[0].sleepTime1 ? '"' + result[0].sleepTime1 + '"' : null}, ${result[0].sleepHours1 ? '"' + result[0].sleepHours1 + '"' : null})`,
    )

    res.send({
      error: false,
      data: { data: result[0], relay: relay, sensor: sensor },
    })
  } catch (error) {
    res.status(500).send({ error: true, message: error })
  }
})

router.get('/device', (req, res, next) => {
  dbConn.query('SELECT * from device', (error, results) => {
    if (error) res.send({ error: true, message: error })
    res.send({ error: false, data: results })
  })
})

router.post('/addSensor', async (req, res, next) => {

  const result = await Promise.all(req.body.sensors.map(sensor => {
    return query(
      `INSERT INTO sensor ( device_id,abstract,param,unit,name,type) VALUES ("${sensor.device_id}","${sensor.abstract}","${sensor.param}","${sensor.unit}","${sensor.name}","${sensor.type}")`,
    )
  }))

  res.status(200).send({ error: false, message: 'add success' })
}
)

router.post('/addRelay', async (req, res, next) => {
  try {
    const result = await Promise.all(req.body.relays.map((relay, index) => {
      return query(
        `INSERT INTO relay (device_id,relay_id,name,remark) VALUES ("${relay.device_id}","${index + 1}","${relay.name}","${relay.remark}")`)
    }))
    res.status(200).send({ error: false, message: 'add success' })
  } catch (error) {
    res.status(500).send({ error: true, message: error })
  }
}
)

router.post('/addSensor', async (req, res, next) => {

  const result = await Promise.all(req.body.sensors.map(sensor => {
    return query(
      `INSERT INTO sensor ( device_id,abstract,param,unit,name,type) VALUES ("${sensor.device_id}","${sensor.abstract}","${sensor.param}","${sensor.unit}","${sensor.name}","${sensor.type}")`,
    )
  }))

  res.status(200).send({ error: false, message: 'add success' })
}
)

router.post('/addDevice', (req, res, next) => {
  dbConn.query(
    `INSERT INTO device ( device_id,topic,proj,name,remark,lat,lon,relays,hasCamera,hasSoilModel) VALUES ("${req.body.device_id}","${req.body.topic}","${req.body.proj}","${req.body.name}","${req.body.remark}","${req.body.lat}","${req.body.lon}","${req.body.relays}","${req.body.hasCamera}","${req.body.hasSoilModel}")`,
  )
  res.status(200).send({ error: false, message: 'add success' })
}
)

router.get('/model_soil', (req, res, next) => {
  dbConn.query('SELECT * from model_soil', (error, results) => {

    if (error) res.send({ error: true, message: error })
    res.send({ error: false, data: results })
  })
})

router.get('/relay', (req, res, next) => {

  dbConn.query('SELECT * from relay', (error, results) => {
    if (error) res.send({ error: true, message: error })
    res.send({ error: false, data: results })
  })
})

router.post('/relay/:device_id', async (req, res, next) => {
  try {
    const result = await query(
      `INSERT INTO relay ( device_id,relay_id,name,abstract,mode,status,remark) VALUES ("${req.body.name}","${req.body.abstract}" ,"${req.body.mode}", "${req.body.status}" 
       where device_id="${req.body.device_id}" and relay_id="${req.body.relay_id}")`,
    )
    res.send({ error: false, data: result[0] })
  } catch (error) {
    res.status(500).send({ error: true, message: error })
  }
})

router.get('/relay/:device_id', (req, res, next) => {
  try {
    dbConn.query(`SELECT * from relay where device_id='${req.params.device_id}'`, (error, results) => {
      if (error) res.send({ error: true, message: error })
      res.send({ error: false, data: results })
    })
  } catch (error) {
    res.send({ error: true, message: error })
  }
})

// router.post('/relay/:device_id', async (req, res, next) => {
//   try {
//     const result = await query(
//       `INSERT INTO relay (device_id, relay_id, name, abstract ,mode, status) VALUES ("${req.body.device_id}","${req.body.relay_id}","${req.body.name}","${req.body.abstract}","${req.body.mode}","${req.body.status}")`,
//     )
//     res.send({ error: false, data: result[0] })
//   } catch (error) {
//     res.status(500).send({ error: true, message: error })
//   }
// })

router.put('/relay/:device_id', async (req, res, next) => {
  try {
    const result = await query(
      `UPDATE relay SET name="${req.body.name}", abstract="${req.body.abstract}" ,mode="${req.body.mode}", status="${req.body.status}" 
       where device_id="${req.body.device_id}" and relay_id="${req.body.relay_id}"`,
    )
    res.send({ error: false, data: result[0] })
  } catch (error) {
    res.status(500).send({ error: true, message: error })
  }
})

router.put('/editRelay/:device_id', async (req, res, next) => {

  try {
    const result = await query(
      `UPDATE relay SET name="${req.body.name}", abstract="${req.body.abstract}" 
       where device_id="${req.params.device_id}" and relay_id="${req.body.relay_id}"`,
    )
    res.status(200).send({ error: false, message: "edit relay success" })
  } catch (error) {
    res.status(500).send({ error: true, message: error })
  }
})

router.put('/editDevice/:device_id', async (req, res, next) => {

  try {
    const result = await query(
      `UPDATE device SET name2="${req.body.name}", abstract="${req.body.abstract}", sleepTime1=${req.body.sleepTime1 ? '"' + req.body.sleepTime1 + '"' : null}, sleepHours1=${req.body.sleepHours1 ? '"' + req.body.sleepHours1 + '"' : null} ,sleepTime2=${req.body.sleepTime2 ? '"' + req.body.sleepTime2 + '"' : null}, sleepHours2=${req.body.sleepHours2 ? '"' + req.body.sleepHours2 + '"' : null},lat="${req.body.lat}", lon="${req.body.lon}" where device_id="${req.params.device_id}"`
    )
    res.status(200).send({ error: false, message: "edit device success" })
  } catch (error) {
    res.status(500).send({ error: true, message: error })
  }
})

router.put('/editSensor/:device_id', async (req, res, next) => {

  try {
    const result = await query(
      `UPDATE sensor SET name="${req.body.name}", abstract="${req.body.abstract}" 
       where device_id="${req.params.device_id}" and id="${req.body.id}"`,
    )
    res.status(200).send({ error: false, message: "edit relay success" })
  } catch (error) {
    res.status(500).send({ error: true, message: error })
  }
})

router.get('/relay_auto', (req, res, next) => {
  dbConn.query('SELECT * from relay_auto', (error, results) => {
    if (error) res.send({ error: true, message: error })
    res.send({ error: false, data: results })
  })
})

router.get('/relay_auto/:device_id', (req, res, next) => {
  try {
    dbConn.query(`SELECT * from relay_auto where device_id='${req.params.device_id}'`, (error, results) => {
      if (error) res.send({ error: true, message: error })
      res.send({ error: false, data: results })
    })
  } catch (error) {
    res.send({ error: true, message: error })
  }
})


/**
 * body => 
 {
    relayAutos: [
      {
        device_id: string,
        relay_id: string,
        from_time: date,
        to_time: date,
        criteria: string
      }
    ]
  }
 */
router.post('/relay_auto/:device_id', async (req, res, next) => {
  try {
    await query(
      `DELETE FROM relay_auto where device_id='${req.params.device_id}'`,
    )

    const result = await Promise.all(req.body.relayAutos.map(relayAuto => {
      return query(
        `INSERT INTO relay_auto (device_id, relay_id, from_time, to_time, criteria) VALUES ("${relayAuto.device_id}","${relayAuto.relay_id}","${relayAuto.from_time}","${relayAuto.to_time}","${relayAuto.criteria}")`,
      )
    }))
    res.send({ error: false, data: result })
  } catch (error) {
    res.status(500).send({ error: true, message: error })
  }
})
// router.post('/relay_auto/:relay_id', async (req, res, next) => {
//   
//   try {
//     await query(
//       `DELETE FROM relay_auto where device_id='${req.body.device_id}'"`,
//     )

//     const result = await query(
//       `INSERT INTO relay_auto (device_id, relay_id, from_time, to_time, criteria) VALUES ("${req.body.device_id}","${req.body.relay_id}","${req.body.from_time}","${req.body.to_time}","${req.body.criteria}")`,
//     )
//     res.send({ error: false, data: result[0] })
//   } catch (error) {
//     res.status(500).send({ error: true, message: error })
//   }
// })

router.get('/sensor', (req, res, next) => {

  dbConn.query('SELECT * from sensor', (error, results) => {
    if (error) res.send({ error: true, message: error })
    res.send({ error: false, data: results })
  })
})

router.get('/user', (req, res, next) => {

  dbConn.query('SELECT * from user', (error, results) => {
    if (error) res.send({ error: true, message: error })
    res.send({ data: results })
  })
})

router.get('/user/2', (req, res, next) => {

  dbConn.query('SELECT * from user where id=2', (error, results) => {
    if (error) res.send({ error: true, message: error })
    res.send({ data: results })
  })
})

router.post('/user', (req, res, next) => {
  dbConn.query(
    'INSERT INTO user (user, birth, name, address, email, tel, date_update, remark) VALUES (?,?,?,?,?,?,?,?)',
  )
})

// router.get(`/user_device/`, (req, res, next) => {
//   
//   dbConn.query(`SELECT * from user_device where user=${dbConn.escape(req.body.user)}`, (error, results) => {
//     if (error) res.send({ error: true, message: error })
//     res.send({ error: false, data: results })
//   })
// })

// router.get('/user_device', loginValidation, (req, res, next) => {
//   dbConn.query(
//     `SELECT * FROM user_device WHERE user = ${dbConn.escape(req.body.user)};`,
//     (err, result) => {
//       // user does not exists
//       if (err) {
//         throw err;
//         return res.status(400).send({
//           msg: err
//         });
//       }
//       if (!result.length) {
//         
//         res.send({ error: false, data: result })
//         return res.status(401).send({
//           msg: 'ID or Birthdate is incorrect!'
//         });
//       }

//     }
//   );
// });

router.post('/register', signupValidation, (req, res, next) => {

  dbConn.query(
    `SELECT * FROM user WHERE ID = (${req.body.ID});`,
    (err, result) => {
      if (err) {
        return res.status(409).send({
          msg: err,
        })
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            })
          } else {
            // has hashed pw => add to database , ${db.escape(hash)})

            dbConn.query(
              `INSERT INTO user (user, birth, name, address, email,ID, tel)  VALUES ('${req.body.users}','${req.body.birth}','${req.body.name}','${req.body.address}', '${req.body.email}','${req.body.ID}','${req.body.tel}')`,
              (err, result) => {
                if (err) {
                  throw err
                  return res.status(400).send({
                    msg: err,
                  })
                }
                return res.status(201).send({
                  msg: 'The user has been registerd with us!',
                })
              },
            )
          }
        })
      }
    },
  )
})

router.post('/login', loginValidation, async (req, res, next) => {

  const result = await query(
    `SELECT * FROM user WHERE ID = '${req.body.citizenID}'`,
  )
  if (!result.length) {
    return res.status(401).send({
      msg: 'ID is incorrect!',
    })
  }
  const birth = await query(
    `SELECT * FROM user WHERE birth = '${req.body.birthdate}'`,
  )
  if (!birth.length) {
    return res.status(401).send({
      msg: 'BirthDate is incorrect!',
    })
  }
  const token = jwt.sign({ id: result.id }, 'the-super-strong-secrect', {
    expiresIn: '1h',
  })
  if (token.length <= 0)
    res.send({ error: true, message: 'ID or Birthdate is incorrect!' })

  //


  const listDeviceId = (await query(
    `SELECT device_id from user_device where user='${result[0].user}'`,
  )).map(row => `'${row.device_id}'`)

  const deviceIdflat = listDeviceId.join(',')

  /**
   * device:
        abstract: "สวนจุฬา100ปี โครงการ วช. "
        date_update: "2022-04-17T09:51:00.000Z"
        device_id: "CU100Park_SoilStation5"
        device_name: "จุดวัดความชื้นดิน"
        id: "71aae6a0-ddff-4dfa-889d-da061116e92f"
        lat: "13.73925310"
        lon: "100.52460944"
        sleepHours1: 6
        sleepHours2: 9
        sleepTime1: "23:00:00"
        sleepTime2: "23:00:00"
   */
  const devices = (await query(
    `SELECT * from device where device_id IN (${deviceIdflat})`,
  )).map(row => ({
    abstract: row.abstract,
    device_id: row.device_id,
    name: row.name,
    name2: row.name2,
    lat: row.lat,
    lon: row.lon,
    sleepHours1: row.sleepHours1,
    sleepHours2: row.sleepHours2,
    sleepTime1: row.sleepTime1,
    sleepTime2: row.sleepTime2
  }))

  const deviceAndSensors = await Promise.all(
    devices.map((device) => {
      //

      // return client.query(
      //   `SELECT * from iotdata where deviceid='${device.device_id}' limit 1`).then((sensors) => ({ device: device, sensors: sensors }))
      return query(
        `SELECT * from sensor where device_id='${device.device_id}'`,
      ).then((sensors) => ({ device: device, sensors: sensors }))
    }
    ),
  )

  const deviceAndSensorsInflux = await Promise.all(
    devices.map((device) => {
      //

      return client.query(
        `SELECT * from iotdata where deviceid='${device.device_id}' limit 1`).then((sensors) => ({ sensors: sensors }))
      // return query(
      //   `SELECT * from sensor where device_id='${device.device_id}'`,
      // ).then((sensors) => ({ device: device, sensors: sensors }))
    }
    ),
  )

  const output = await Promise.all(
    deviceAndSensors.map((deviceAndSensor) => {
      return query(
        `SELECT * from relay where device_id='${deviceAndSensor.device.device_id}'`,
      ).then((relays) => ({
        device: deviceAndSensor.device,
        sensors: deviceAndSensor.sensors,
        influxsensors: deviceAndSensorsInflux,
        relays: relays,
      }))
    },
    ),
  )

  res.send({
    msg: 'Logged in!',
    token,
    user: result[0],
    device: output,
  })
})


router.post('/loginAdmin', loginValidation, async (req, res, next) => {

  const result = await query(
    `SELECT * FROM user WHERE ID = '${req.body.citizenID}'`,
  )
  if (!result.length) {
    return res.status(401).send({
      msg: 'ID is incorrect!',
    })
  }
  const birth = await query(
    `SELECT * FROM user WHERE birth = '${req.body.birthdate}'`,
  )
  if (!birth.length) {
    return res.status(401).send({
      msg: 'BirthDate is incorrect!',
    })
  }
  const token = jwt.sign({ id: result.id }, 'the-super-strong-secrect', {
    expiresIn: '1h',
  })
  if (token.length <= 0)
    res.send({ error: true, message: 'ID or Birthdate is incorrect!' })

  //


  const listDeviceId = (await query(
    `SELECT device_id from user_device where user='${result[0].user}'`,
  )).map(row => `'${row.device_id}'`)

  const deviceIdflat = listDeviceId.join(',')

  /**
   * device:
        abstract: "สวนจุฬา100ปี โครงการ วช. "
        date_update: "2022-04-17T09:51:00.000Z"
        device_id: "CU100Park_SoilStation5"
        device_name: "จุดวัดความชื้นดิน"
        id: "71aae6a0-ddff-4dfa-889d-da061116e92f"
        lat: "13.73925310"
        lon: "100.52460944"
        sleepHours1: 6
        sleepHours2: 9
        sleepTime1: "23:00:00"
        sleepTime2: "23:00:00"
   */
  const devices = (await query(
    `SELECT * from device`,
  )).map(row => ({
    abstract: row.abstract,
    device_id: row.device_id,
    name: row.name,
    name2: row.name2,
    lat: row.lat,
    lon: row.lon,
    sleepHours1: row.sleepHours1,
    sleepHours2: row.sleepHours2,
    sleepTime1: row.sleepTime1,
    sleepTime2: row.sleepTime2
  }))

  const deviceAndSensors = await Promise.all(
    devices.map((device) => {
      //

      // return client.query(
      //   `SELECT * from iotdata where deviceid='${device.device_id}' limit 1`).then((sensors) => ({ device: device, sensors: sensors }))
      return query(
        `SELECT * from sensor where device_id='${device.device_id}'`,
      ).then((sensors) => ({ device: device, sensors: sensors }))
    }
    ),
  )

  const deviceAndSensorsInflux = await Promise.all(
    devices.map((device) => {
      //

      return client.query(
        `SELECT * from iotdata where deviceid='${device.device_id}' limit 1`).then((sensors) => ({ sensors: sensors }))
      // return query(
      //   `SELECT * from sensor where device_id='${device.device_id}'`,
      // ).then((sensors) => ({ device: device, sensors: sensors }))
    }
    ),
  )

  const output = await Promise.all(
    deviceAndSensors.map((deviceAndSensor) => {
      return query(
        `SELECT * from relay where device_id='${deviceAndSensor.device.device_id}'`,
      ).then((relays) => ({
        device: deviceAndSensor.device,
        sensors: deviceAndSensor.sensors,
        influxsensors: deviceAndSensorsInflux,
        relays: relays,
      }))
    },
    ),
  )

  res.send({
    msg: 'Logged in!',
    token,
    user: result[0],
    device: output,
  })
})




router.get('/sensorGraph/:deviceId', async (req, res, next) => {
  // SELECT * from iotdata where deviceid='${req.params.deviceId}' and time < now() - 7d limit 50
  const result = await client.query(
    `SELECT * from iotdata where deviceid='${req.params.deviceId}' and time < now() - 7d limit 7`)
  res.send(result)
})


router.get('/getUser/:user', loginValidation, async (req, res, next) => {

  const devices = await query(
    `SELECT * from user_device where user='${req.params.user}'`,
  )

  const deviceAndSensors = await Promise.all(
    devices.map((device) => {
      //

      // return client.query(
      //   `SELECT * from iotdata where deviceid='${device.device_id}' limit 1`).then((sensors) => ({ device: device, sensors: sensors }))
      return query(
        `SELECT * from sensor where device_id='${device.device_id}'`,
      ).then((sensors) => ({ device: device, sensors: sensors }))
    }
    ),
  )

  const deviceAndSensorsInflux = await Promise.all(
    devices.map((device) => {
      //

      // return client.query(
      //   `SELECT * from iotdata where deviceid='${device.device_id}' limit 100`).then((sensors) => ({ sensors: sensors }))
      return client.query(
        `SELECT * from iotdata where deviceid= '${device.device_id}' and time < now() - 7d `).then((sensors) => ({ sensors: sensors }))

      // return query(
      //   `SELECT * from sensor where device_id='${device.device_id}'`,
      // ).then((sensors) => ({ device: device, sensors: sensors }))
    }
    ),
  )

  const output = await Promise.all(
    deviceAndSensors.map((deviceAndSensor) => {
      return query(
        `SELECT * from relay where device_id='${deviceAndSensor.device.device_id}'`,
      ).then((relays) => ({
        device: deviceAndSensor.device,
        sensors: deviceAndSensor.sensors,
        influxsensors: deviceAndSensorsInflux,
        relays: relays,
      }))
    },
    ),
  )

  res.send({
    device: output,
  })
})


// router.post('/login', loginValidation, async (req, res, next) => {
//   dbConn.query(
//     `SELECT * FROM user WHERE ID = ${dbConn.escape(req.body.citizenID)};`,
//     (err, result) => {
//       // user does not exists
//       if (err) {
//         throw err;
//         return res.status(400).send({
//           msg: err
//         });
//       }
//       if (!result.length) {
//         
//         return res.status(401).send({
//           msg: 'ID or Birthdate is incorrect!'
//         });
//       }
//       // check password
//       dbConn.query(
//         `SELECT * FROM user WHERE birth = ${dbConn.escape(req.body.birthdate)};`,
//         (err, result) => {
//           // wrong password
//           if (err) {
//             // throw err;
//             return res.status(401).send({
//               msg: 'ID or Birthdate is incorrect!'
//             });
//           }

//           if (result) {
//             const token = jwt.sign({ id: result[0].id }, 'the-super-strong-secrect', { expiresIn: '1h' });
//             // dbConn.query(
//             //   `UPDATE user SET last_login = now() WHERE ID = '${result[0].id}'`
//             // );
//             if (error) res.send({ error: true, message: error })
//             res.send({
//               msg: 'Logged in!',
//               token,
//               user: result[0],
//               device: user_device,
//               relay: relay,
//               sensor: sensor,
//             })
//           } else {
//             return res.status(401).send({
//               msg: 'ID or Birthdate is incorrect!'
//             });
//           }
//         }
//       );
//     }
//   );
// });

router.post('/get-user', signupValidation, (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer') ||
    !req.headers.authorization.split(' ')[1]
  ) {
    return res.status(422).json({
      message: 'Please provide the token',
    })
  }
  const theToken = req.headers.authorization.split(' ')[1]
  const decoded = jwt.verify(theToken, 'the-super-strong-secrect')
  dbConn.query('SELECT * FROM users where id=?', decoded.id, function (
    error,
    results,
    fields,
  ) {
    if (error) throw error
    return res.send({
      error: false,
      data: results[0],
      message: 'Fetch Successfully.',
    })
  })
})

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(router)

// Your Channel access token (long-lived)
const CH_ACCESS_TOKEN = ''

// MQTT Topic
var mqtt_topic = 'CU-IoT/240AC4585A10/command'
var mqtt_topic_status = 'CU-IoT/240AC4585A10/status'
const mqtt_host = 'cusensor.net'
const port = '1883'
const clientId = 'mqttx_6eef9322'

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

app.use(bodyParser.json())
app.set('port', process.env.PORT || 3100)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
var cron = require('node-cron');
var mqtt = require('mqtt')

router.post('/mqtt', async (req, res) => {

  //   cron.schedule('* * * * *', async function schedulerMqtt() {
  //     
  //     /**
  //      * 1. get device
  //      * 2. get relay
  //      * 3. loop relay of each relay is 1 or 0 
  //      *  3.1 relay mode 0 or 1 
  // *       3.2 if 0 return 0
  // *       3.3 if 1 check period and criteria and return 0 or 1
  //             3.3.1 check current time is between period
  //             3.3.2 check criteria [sensor, condtion]
  //                 a. get sensor value
  //                 b. convert criteria to condition code
  //                 c. return criteria result
  //             3.3.3 return with and operation
  //         3.4 make format for mqtt
  //             3.4.1 
  //     4. make mqtt data format
  //     5. send mqtt
  //      */



  //   });
  const relays = await getListRelays(req.body.device_id)

  const resultListRelayBinary = await Promise.all(relays.map(async (relay) => {
    if (relay.mode === 0) {
      // Info
      const RelayStatus = relay.status === 1 ? '1' : '0'
      return RelayStatus
    }
    else if (relay.mode === 1) {
      const relayAutos = await getListRelayAuto(relay.device_id, relay.relay_id)
      //
      const resultRelayAuto = await Promise.all(relayAutos.map((relayAuto) => something(relayAuto)))

      const result = await resultRelayAuto.reduce((previous, current) => current && previous)

      return result ? '1' : '0'
    }
  }))
  const relayBi = resultListRelayBinary.join('')

  const resultRelayBinary = parseInt(relayBi)

  sendMqttCMD(resultRelayBinary)


  async function something(relayAuto) {

    var compareDate = moment();
    var startDate = moment(relayAuto.from_time).set({ 'year': moment().get('year'), 'month': moment().get('month'), 'date': moment().get('date') });
    //
    var endDate = moment(relayAuto.to_time).set({ 'year': moment().get('year'), 'month': moment().get('month'), 'date': moment().get('date') });
    //
    const isBetweenPeriod = compareDate.isBetween(startDate, endDate);
    //
    const isUnderCriteria = await checkCriteria(relayAuto.criteria, relayAuto.device_id);
    //
    if (isUnderCriteria && isBetweenPeriod) {
      return true
    } else {
      return false
    }
  }
  async function getListRelays(deviceId) {

    const result = await query(`SELECT * from relay where device_id = '${deviceId}'`)

    return result
  }

  async function checkCriteria(criteria, device_id) {
    const [sensorName, compare, conditionValue] = criteria.split(' ')
    const sensorValue = await client.query(
      `SELECT * from iotdata limit 1`)
    // 
    if (!sensorValue.length == 0 || !sensorValue[0][`${sensorName}`]) {
      return false
    }
    else if (compare === '10') {
      //

      return sensorValue[0][`${sensorName}`] > conditionValue
    }
    else {
      sensorValue[0][`${sensorName}`] <= conditionValue
    }

  }

  // checkCriteria = async (criteria, device_id) => {
  //   try {
  //     const [sensorName, compare, conditionValue] = criteria.split(' ')
  //     const sensorValue = await client.query(
  //       `SELECT ${sensorName} from iotdata where deviceid='${device_id}' limit 1`)
  //     if (compare === '10') {
  //       

  //       return sensorValue > conditionValue
  //     }
  //     else {
  //       sensorValue <= conditionValue
  //     }
  //   } catch (err) {
  //     
  //   }
  // }


  async function getListRelayAuto(deviceId, relayId) {
    const result = await query(`SELECT * from relay_auto where device_id = '${deviceId}'`,)
    return result
  }

  // async function getListRelayAuto(devideId, relayId) {
  //   const result = await query(`SELECT * from relay_auto where device_id = ${deviceId}`,)
  //   return result
  // }

  // var mqtt_topic = 'CU-IoT/240AC4585A10/command'
  // var mqtt_topic_status = 'CU-IoT/240AC4585A10/status'
  // const mqtt_host = 'cusensor.net'
  // const port = '1883'
  // const clientId = 'mqttx_c37a88e6'

  // // MQTT Host
  // const connectUrl = `mqtt://${mqtt_host}:${port}`
  // // MQTT Config
  // var options = {
  //   port,
  //   mqtt_host,
  //   clientId,
  //   clean: true,
  //   connectTimeout: 4000,
  //   username: 'nansensor',
  //   password: 'nan1357',
  //   reconnectPeriod: 1000,
  // }

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
      client.publish(mqtt_topic, JSON.stringify({ get: digit }), function () {

        // client.end(); // Close the connection when published
      })
      // client.publish(mqtt_topic, JSON.stringify({ get: digit }), function () {
      //   
      //   //client.end(); // Close the connection when published
      // })
    })

  }




})

const serverPort = 3100
app.listen(serverPort, () => {
  console.log("server is starting at port ", serverPort)
})
