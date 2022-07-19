/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import { useLocation } from "react-router-dom";
import ReactApexChart from 'react-apexcharts'
import { observer, inject } from "mobx-react";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import barData from "layouts/dashboard/data/barData";
import { useEffect, useState } from "react";
import _ from 'lodash';
import axios from "axios";
import config from '../../config/config'
//import { InfluxChart } from "./Influx";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Report(props) {
  const location = useLocation();


  //   const getGraphDetailed = async (device_id) => {
  //     try {
  //       const response = await axios.get(`${config.backendUrl}/sensorGraph/${location.state.sensor[0].device_id}`);
  //       const { data } = response;
  //       

  //     } catch (err) {
  //       
  //     }
  //   }

  //  



  const [relayOption, setRelayOption] = useState({
    options: {
      chart: {
        id: 'fb',
        group: 'social',
        type: 'line',
        height: 160
      },
      colors: ['#008FFB'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Product Trends by Month',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },

    },
  })


  useEffect(() => {
    const init = async () => {

      const resultRelayAuto = await props.deviceStore.getGraphDetailed()

    };
    init();

  }, []);



  const { sensors } = props.deviceStore.toJS();

  const generateRelay = () => {
    {
      {
        location.state.sensor?.map((sensor, index) => (
          (sensors).map((sensorName) => {
            return (
              [{
                name: sensor,
                data: [sensorName[sensor]]
              }]
            )
          })
        ))
      }

    }
  }

  // const generateRelay = () => {
  //   const result = location.state.sensor.map(sensor => ({
  //     name: `${sensor.name}`,
  //     data: _.keys(sensor)
  //   }))

  //   return ({
  //     series: [{ data: result }]
  //   })
  // }

  const [relaySeries, setRelaySeries] = useState({
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  })

  return (

    <DashboardLayout>
      {location.state.sensor.map((sensor, index) => (
        <ReactApexChart options={relayOption.options} series={relaySeries.series} type="line" height={350} />
        // <Chart
        //   options={relayOption.options}
        //   series={relaySeries.series}
        //   type="line"
        //   width="500"
        // />
      ))
      }
    </DashboardLayout>

  );


}

export default inject("deviceStore")(observer(Report));



(sensors).map((sensorName) => {

  return (
    [{
      name: name,
      data: [`${sensorName[name]}`]
    }]
  )
})