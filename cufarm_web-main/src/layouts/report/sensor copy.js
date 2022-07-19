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
import React, { Component } from 'react';

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
  this.state = {
          
    series: [{
      data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
        min: 10,
        max: 60
      })
    }],
    options: {
      chart: {
        id: 'fb',
        group: 'social',
        type: 'line',
        height: 160
      },
      colors: ['#008FFB']
    },
  
    seriesLine2: [{
      data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
        min: 10,
        max: 30
      })
    }],
    optionsLine2: {
      chart: {
        id: 'tw',
        group: 'social',
        type: 'line',
        height: 160
      },
      colors: ['#546E7A']
    },
  
    seriesArea: [{
      data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
        min: 10,
        max: 60
      })
    }],
    optionsArea: {
      chart: {
        id: 'yt',
        group: 'social',
        type: 'area',
        height: 160
      },
      colors: ['#00E396']
    },
  
    seriesSmall: [{
      data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
        min: 10,
        max: 60
      })
    }],
    optionsSmall: {
      chart: {
        id: 'ig',
        group: 'social',
        type: 'area',
        height: 160,
        width: 300
      },
      colors: ['#008FFB']
    },
  
    seriesSmall2: [{
      data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
        min: 10,
        max: 60
      })
    }],
    optionsSmall2: {
      chart: {
        id: 'li',
        group: 'social',
        type: 'area',
        height: 160,
        width: 300
      },
      colors: ['#546E7A']
    },
  
  
  };
}



render() {
  return (
    

<div id="wrapper">
<div id="chart-line">
<ReactApexChart options={this.state.options} series={this.state.series} type="line" height={160} />
</div>
<div id="chart-line2">
<ReactApexChart options={this.state.optionsLine2} series={this.state.seriesLine2} type="line" height={160} />
</div>
<div id="chart-area">
<ReactApexChart options={this.state.optionsArea} series={this.state.seriesArea} type="area" height={160} />
</div>
<div class="columns">
<div id="chart-small">
<ReactApexChart options={this.state.optionsSmall} series={this.state.seriesSmall} type="area" height={160} width={300} />
</div>
<div id="chart-small2">
<ReactApexChart options={this.state.optionsSmall2} series={this.state.seriesSmall2} type="area" height={160} width={300} />
</div>
</div>

</div>


  );
}
}

}

export default Report;
