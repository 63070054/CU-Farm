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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import DashboardUser from "layouts/dashboard-user";
import Tables from "layouts/tables";
import Notifications from "layouts/notifications";
import Recommend from "layouts/recommend";
import Report from "layouts/report";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import AddDevice from "layouts/add-device-to-db/add-device";
import AddDevice2nd from "layouts/add-device-to-db/add-device-2nd-page";
import AddDevice3rd from "layouts/add-device-to-db/add-device-3rd-page";
import Mqtt from './components/Mqtt/'
import auth from "utilis/auth"
import DeviceDetail from './examples/Cards/StatisticsCards/ComplexCard'
import ListDevice from "layouts/add-device-to-db/list-device"
import ReportSensor from "layouts/report/sensor";

// @mui icons
import Icon from "@mui/material/Icon";
import { inject } from "mobx-react";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboardUser",
    component: <DashboardUser />,
  },
  {
    type: "collapse",
    name: "User Management",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Device Management",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/device-config",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Import Soil Modal",
    key: "recommend",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/recommend-value",
    component: <Recommend />,
  },
  {
    type: "",
    name: "Report",
    key: "Report",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/report",
    component: <Report />,
  },
  {
    type: "",
    name: "MqttBE",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/MqttBE",
    component: <Mqtt />,
  },
  {
    type: "",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "",
    name: "Device Details",
    key: "device-details",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/deviceDetail",
    component: <DeviceDetail />,
  },
  {
    type: "collapse",
    name: "Add Device to DB",
    key: "device-details",
    icon: <Icon fontSize="small">Add Device to DB</Icon>,
    route: "/addDevice",
    component: <AddDevice />,
  },
  {
    type: "",
    name: "Add Device to DB",
    key: "device-details",
    icon: <Icon fontSize="small">B</Icon>,
    route: "/addDevice2nd",
    component: <AddDevice2nd />,
  },
  {
    type: "",
    name: "Add Device to DB",
    key: "device-details",
    icon: <Icon fontSize="small">B</Icon>,
    route: "/addDevice3rd",
    component: <AddDevice3rd />,
  },
  {
    type: "collapse",
    name: "Device Manangement",
    key: "Device",
    icon: <Icon fontSize="small">D</Icon>,
    route: "/listDevice",
    component: <ListDevice />,
  },
  {
    type: "",
    name: "Report sensor",
    key: "report-sensor",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/reportSensor",
    component: <ReportSensor />,
  },
];




export default routes;
