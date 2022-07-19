/* eslint-disable react/destructuring-assignment */
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

// react-router-dom components
import { useNavigate, Link } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import Swal from "sweetalert2";
import config from 'config/config'
import axios from "axios";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { observer, inject } from "mobx-react";
// Authentication layout components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover(props) {
  // const router = useRouter();
  const navigate = useNavigate();
  const [errors, setError] = useState({
    device_id: "",
    topic: "",
    proj: "",
    name: "",
    name2: "",
    abstract: "",
    lat: "",
    lon: "",
    relays: "",
    hasCamera: "",
    sleepTime1: "",
    sleepHours1: "",
    sleepTime2: "",
    sleepHours2: "",
  })

  const [relayState, setRelayState] = useState({
    name: props.device.name,
    abstract: props.device.abstract,
    lat: props.device.lat,
    lon: props.device.lon,
    sleepTime1: props.device.sleepTime1,
    sleepHours1: props.device.sleepHours1,
    sleepTime2: props.device.sleepTime2,
    sleepHours2: props.device.sleepHours2,
  })

  const handleChangeDevice = (value, key) => {

    setRelayState(relayState => ({
      ...relayState,
      [key]: value
    }));
  };

  const submitDetail = async (relayState) => {
    // 
    // try {
    //   const response = await axios.post(`${config.backendUrl}/device/${props.device.device_id}`, relayState);
    //   
    //   if (response.status === 200) {
    //     return response;
    //   }
    // } catch (err) {
    //   return err?.response?.data?.message;
    // } finally {
    // }
    props.callback(relayState)
    // Swal.fire("Success", "edit detailed success", "success")
  }

  return (
    <DashboardLayout>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            ปุ่มแก้ชื่อ + คำอธิบายของ Device
          </MDTypography>

        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="ชื่ออุปกรณ์"
                variant="standard"
                fullWidth
                value={relayState.name}
                onChange={(html) => handleChangeDevice(html.target.value, "name")}
              />
              <span style={{ color: "red" }}>{errors.name}</span>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="คำอธิบายอุปกรณ์"
                variant="standard"
                fullWidth
                value={relayState.abstract}
                onChange={(html) => handleChangeDevice(html.target.value, "abstract")}
              />
              <span style={{ color: "red" }}>{errors.abstract}</span>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Latitude"
                variant="standard"
                fullWidth
                value={relayState.lat}
                onChange={(html) => handleChangeDevice(html.target.value, "lat")}
              />
              <span style={{ color: "red" }}>{errors.lat}</span>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Longtitude"
                variant="standard"
                fullWidth
                value={relayState.lon}
                onChange={(html) => handleChangeDevice(html.target.value, "lon")}
              />
              <span style={{ color: "red" }}>{errors.lon}</span>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="sleepTime1"
                variant="standard"
                fullWidth
                value={relayState.sleepTime1}
                onChange={(html) => handleChangeDevice(html.target.value, "sleepTime1")}
              />
              <span style={{ color: "red" }}>{errors.sleepTime1}</span>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="sleepHours1"
                variant="standard"
                fullWidth
                value={relayState.sleepHours1}
                onChange={(html) => handleChangeDevice(html.target.value, "sleepHours1")}
              />
              <span style={{ color: "red" }}>{errors.sleepHours1}</span>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="sleepTime2"
                variant="standard"
                fullWidth
                value={relayState.sleepTime2}
                onChange={(html) => handleChangeDevice(html.target.value, "sleepTime2")}
              />
              <span style={{ color: "red" }}>{errors.sleepTime2}</span>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="sleepHours2"
                variant="standard"
                fullWidth
                value={relayState.sleepHours2}
                onChange={(html) => handleChangeDevice(html.target.value, "sleepHours2")}
              />
              <span style={{ color: "red" }}>{errors.sleepHours2}</span>
            </MDBox>


          </MDBox>
        </MDBox>
        <MDBox p={2} mt={-3} mb={1}>
          <MDButton
            type="submit"
            variant="gradient"
            color="info"
            fullWidth
            onClick={() => submitDetail(relayState)}
          >
            บันทึก
          </MDButton>
        </MDBox>
      </Card>
    </DashboardLayout>

  );
}
export default Cover;
