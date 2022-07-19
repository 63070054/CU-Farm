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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import { observer, inject } from 'mobx-react';
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import drop from "assets/images/drop.png";
import soil from "assets/images/soil.png";
import thermometer from "assets/images/thermometer.png";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import TimePicker from '@mui/lab/TimePicker';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Stack from '@mui/material/Stack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useNavigate } from "react-router-dom";
import { StyledEngineProvider } from '@mui/material/styles';
import _ from 'lodash';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import auth from "../../utilis/auth"
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Swal from "sweetalert2";


function listDevice(props) {
  useEffect(() => {
    const init = async () => {
      const isLogin = auth.isAuthenticated()
      const { listDevice } = props.deviceStore.toJS();
      const result = await props.deviceStore.getAllDevice()

    };
    init();
  }, []);
  const navigate = useNavigate();
  const { listDevice } = props.deviceStore.toJS();
  // const [listDeviceState, setListDeviceState] = useState(listDevice.data)
  const addRelays = (relayDetail) => {

    navigate("/addDevice2nd", { state: relayDetail })
  }

  const addSensors = (sensorDetail) => {

    navigate("/addDevice3rd", { state: sensorDetail })
  }

  const removeDevice = async (device_id) => {
    const status = await props.deviceStore.removeDevice(device_id);

    // if (status === 200) {
    //   const { user_device } = props.authStore.toJS();
    //   await props.authStore.login(user_device.user.ID, user_device.user.birth)
    // }
    if (status === 200) {
      Swal.fire("Success", "delete device success", "success");
      const { listDevice } = props.deviceStore.toJS();
      await props.deviceStore.getAllDevice()
    } else {
      Swal.fire("Success", "delete device success", "success");
      const { listDevice } = props.deviceStore.toJS();
      await props.deviceStore.getAllDevice()
      // Swal.fire({ icon: 'warning', text: "delete device failed" });

    }
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {listDevice.data && (listDevice.data).map((customer, index) => (
        <>
          <Card mb={3}>
            <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
              <MDBox
                variant="gradient"
                // bgColor="info"
                // color={"dark"}
                // coloredShadow="info"
                borderRadius="xl"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="4rem"
                height="4rem"

              >

                <Icon fontSize="medium" color="inherit" icon="weekend" />
              </MDBox>
              <MDBox textAlign="right" lineHeight={1.25}>
                <MDTypography variant="h6" fontWeight="light" color="text">
                  {customer.name}
                </MDTypography>
                <MDTypography variant="button">{customer.device_id}</MDTypography>
              </MDBox>
            </MDBox>
            <Divider />
            <MDTypography pl={4} variant="button">Device ID :{customer.device_id}</MDTypography>
            <MDTypography pl={4} variant="button">MQTT Topic :{customer.topic}</MDTypography>
            <MDTypography pl={4} variant="button">Influx Project :{customer.proj}</MDTypography>
            <MDTypography pl={4} variant="button">ชื่อ Device:{customer.name}</MDTypography>
            <MDTypography pl={4} variant="button">abstract :{customer.abstract}</MDTypography>
            <MDTypography pl={4} variant="button">latitude :{customer.lat}</MDTypography>
            <MDTypography pl={4} variant="button">longtitude :{customer.lon}</MDTypography>
            <MDTypography pl={4} variant="button">sleepTime1 :{customer.sleepTime1}</MDTypography>
            <MDTypography pl={4} variant="button">sleepHours1 :{customer.sleepHours1}</MDTypography>
            <MDTypography pl={4} variant="button">sleepTime2 :{customer.sleepTime2}</MDTypography>
            <MDTypography pl={4} variant="button">sleepHours2 :{customer.sleepHours2}</MDTypography>
            <MDTypography pl={4} variant="button">จำนวนของ Relay :{customer.relays}</MDTypography>
            <MDTypography pl={4} variant="button">hasCamera :{customer.hasCamera}</MDTypography>
            <MDTypography pl={4} variant="button">hasSoilModel :{customer.hasSoilModel}</MDTypography>
            <MDBox pb={2} px={2}>
              <MDButton variant="gradient" color="info" fullWidth onClick={() => addRelays(customer)} >
                เพิ่ม relay
              </MDButton>

            </MDBox>
            <MDBox pb={2} px={2}>
              <MDButton variant="gradient" color="info" fullWidth onClick={() => addSensors(customer)}>
                เพิ่ม sensor
              </MDButton>

            </MDBox>

            <MDBox pb={2} px={2}>
              <MDButton variant="gradient" color="primary" fullWidth onClick={() => removeDevice(customer.device_id)} >
                ลบอุปกรณ์
              </MDButton>

            </MDBox>
          </Card>
          <MDBox mb={2} ></MDBox>
        </>
      ))}
    </DashboardLayout>
  );
}

// Setting default values for the props of listDevice
listDevice.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
};

// Typechecking props for the listDevice

listDevice.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
};

export default inject("deviceStore")(observer(listDevice));
