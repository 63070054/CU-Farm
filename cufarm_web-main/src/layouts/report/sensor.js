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

function ReportSensor(props) {
  const location = useLocation();
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
        curve: 'smooth'
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
        categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
      },

    },
  })

  const { sensors } = props.deviceStore.toJS();


  useEffect(async () => {
    await props.deviceStore.getGraphDetailed(location.state.sensor[0].device_id)
    console.log(sensors)
  }, []);



  const generateRelay = (name) => {
    const series = []
    sensors.map((sensorName) => {
      series.push(sensorName[name])
    })
    return (
      [{
        name: name,
        data: series
      }]
    )
    // return (
    //   [{
    //     name: "Series1",
    //     data: ['45', '80', '50', '70', '40', '60', '70', '20', '10']
    //   }, {
    //     name: "Series2",
    //     data: ['85']
    //   }]
    // )
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {location.state.sensor.map((sensor, index) => (
        <ReactApexChart key={index} options={relayOption.options} series={generateRelay(sensor.param)} type="line" height={350} />
      ))
      }
    </DashboardLayout>
  );


}

export default inject("deviceStore")(observer(ReportSensor));
