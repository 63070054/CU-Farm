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
import moment from 'moment';

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import ReactApexChart from 'react-apexcharts'
import React, { Component } from 'react';

function ApexChart(props) {
  const location = useLocation();

  useEffect(() => {
  }, [])

  const generateRelay = () => {
    const result = location.state.relay.map(relay => ({
      x: `${relay.name}`,
      y: [
        new Date(relay.timeStart).getTime(),

        // new Date('2019-03-05').getTime(),
        // new Date('2019-04-05').getTime()
        new Date(relay.timeStop).getTime(),

        // moment(relay.timeStop).toDate().getTime(),
      ]
    }))

    return ({
      series: [{ data: result }]
    })
  }

  const [relayOption, setRelayOption] = useState({
    options: {
      chart: {
        height: 350,
        type: 'rangeBar'
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      xaxis: {
        type: 'datetime'
      }
    }
  })

  const [relaySeries, setRelaySeries] = useState(generateRelay().series)
  return (

    <DashboardLayout>
      <DashboardNavbar />
      <ReactApexChart options={relayOption.options} series={relaySeries} type="rangeBar" height={350} />
    </DashboardLayout>

  );

}

export default ApexChart;
