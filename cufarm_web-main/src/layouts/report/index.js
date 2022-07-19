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
import auth from "../../utilis/auth"
import { observer, inject } from "mobx-react";
import { useNavigate } from "react-router-dom";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import ReactApexChart from 'react-apexcharts'
import React, { Component } from 'react';

function ApexChart(props) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(async () => {
    await generateRelay()
  }, [])

  const generateRelay = async () => {
    let series = [{
      data: []
    }, {
      data: []
    }]
    let count = 0
    location.state.relay.map(relay => {
      count += 1
      series = [{
        data: [...series[0].data, {
          x: relay.name,
          y: [new Date(relay.timeStart).getTime() || 2 + count, new Date(relay.timeStop).getTime() || 11 + count/5]
          // y: [new Date(relay.timeStart).getTime() || 0, new Date(relay.timeStop).getTime() || 0]
        }]
      }, {
          data: [...series[1].data, {
            x: relay.name,
            y: [new Date(relay.timeStart).getTime() || 1 + count, new Date(relay.timeStop).getTime() || 11 + count / 8]
          }]
        }]
    }
    )

    setRelaySeries(series)

  }

  const [relayOption, setRelayOption] = useState({
    options: {
      chart: {
        type: 'rangeBar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
    }
  })

  const [relaySeries, setRelaySeries] = useState([])

  const { user_device } = props.authStore.toJS();

  if (!user_device.device) {

    auth.signOutAndClear();
    navigate("/authentication/sign-in")
    return false
  };

  return (

    <DashboardLayout>
      <DashboardNavbar />
      <ReactApexChart options={relayOption.options} series={relaySeries} type="rangeBar" height={350} />
    </DashboardLayout>

  );

}

export default inject("authStore")(observer(ApexChart));
