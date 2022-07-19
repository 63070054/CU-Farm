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

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Report() {
  const location = useLocation();

  const generateRelay = () => {
    const result = location.state.sensor.map(sensor => ({
      name: `${sensor.name}`,
      data: _.keys(sensor)
    }))

    return ({
      series: [{ data: result }]
    })
  }
  const [relayOption, setRelayOption] = useState({
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      }
    },
  })

  const [relaySeries, setRelaySeries] = useState(generateRelay().series)


  return (
    <DashboardLayout>
      <ReactApexChart options={relayOption.options} series={relaySeries} type="line" height={350} />
    </DashboardLayout>
  );


}

export default Report;
