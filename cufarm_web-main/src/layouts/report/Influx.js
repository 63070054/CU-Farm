import React, { useState, useEffect } from "react";
import { InfluxDB } from "@influxdata/influxdb-client";
import { ResponsiveLine } from "@nivo/line";

const token = "YOUR-TOKEN";
const org = "org-name";
const bucket = "iotdata";
const url = "http://209.15.97.183:8086";

let query = `from(bucket: "iotdata")
  |> range(start: -1h)
  |> filter(fn: (r) => r["batt"] == "batt")
  |> aggregateWindow(every: 5m, fn: mean, createEmpty: false)
  |> yield(name: "mean")`;


export const InfluxChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let res = [];
    const influxQuery = async () => {
      //create InfluxDB client
      const queryApi = await new InfluxDB({ url }).getQueryApi();
      //make query
      await queryApi.queryRows(query, {
        next(row, tableMeta) {

          const o = tableMeta.toObject(row);
          //push rows from query into an array object
          res.push(o);
        },
        complete() {

          let finalData = []

          //variable is used to track if the current ID already has a key
          var exists = false

          //nested for loops aren't ideal, this could be optimized but gets the job done
          for (let i = 0; i < res.length; i++) {
            for (let j = 0; j < finalData.length; j++) {
              //check if the sensor ID is already in the array, if true we want to add the current data point to the array
              if (res[i]['id'] === finalData[j]['id']) {
                exists = true

                let point = {}
                point["x"] = res[i]["_time"];
                point["y"] = res[i]["_value"];
                finalData[j]["data"].push(point)
              }

            }
            //if the ID does not exist, create the key and append first data point to array
            if (!exists) {
              let d = {}
              d["id"] = res[i]["id"];
              d['data'] = []
              let point = {}
              point["x"] = res[i]["_time"];
              point["y"] = res[i]["_value"];
              d['data'].push(point)
              finalData.push(d)
            }
            //need to set this back to false
            exists = false


          }

          setData(finalData);


        },
        error(error) {

        }
      });

    };

    influxQuery();
  }, []);

  return (
    <ResponsiveLine
      data={data}
    />
  )
};