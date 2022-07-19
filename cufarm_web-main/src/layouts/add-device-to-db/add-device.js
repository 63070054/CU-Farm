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
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import config from '../../config/config'
import axios from "axios";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { observer, inject } from "mobx-react";
// Authentication layout components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover(props) {
  // const router = useRouter();
  const navigate = useNavigate();
  const [device, setDevice] = useState({
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
    hasSoilModel: ""
  });


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
  });
  useEffect(() => {
    const init = async () => {
      const { device } = props.deviceStore.toJS();


    };
    init();
  }, []);



  const handleChange = (value, key) => {
    setDevice(device => ({
      ...device,
      [key]: value
    }));
  };


  // const submitDetail = async (device) => {
  //   await props.deviceStore.submitDetail(device)
  // }


  const onSave = async () => {

    const status = await props.deviceStore.submitDetail(device)

    if (status === 200) {
      Swal.fire("Success", "add device success", "success").then(function () {
        // Redirect the user
        window.location.href = "/listDevice";
      });
    } else {
      Swal.fire("Waring", "failed to add device", "failed")
    }


  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
            การเพิ่มอุปกรณ์หน้าที่ 1
          </MDTypography>

        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Device ID"
                variant="standard"
                fullWidth
                value={device.device_id}
                onChange={(html) => handleChange(html.target.value, "device_id")}
              />
              <span style={{ color: "red" }}>{errors.name}</span>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="MQTT Topic"
                variant="standard"
                fullWidth
                value={device.topic}
                onChange={(html) => handleChange(html.target.value, "topic")}
              />
              <span style={{ color: "red" }}>{errors.birth}</span>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Influx project"
                variant="standard"
                fullWidth
                value={device.proj}
                onChange={(html) => handleChange(html.target.value, "proj")}
              />
              <span style={{ color: "red" }}>{errors.ID}</span>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="ชื่อ Device"
                variant="standard"
                fullWidth
                value={device.name}
                onChange={(html) => handleChange(html.target.value, "name")}
              />
              <span style={{ color: "red" }}>{errors.address}</span>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Remark"
                variant="standard"
                fullWidth
                value={device.remark}
                onChange={(html) => handleChange(html.target.value, "remark")}
              />
              <span style={{ color: "red" }}>{errors.tel}</span>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Latitude"
                variant="standard"
                fullWidth
                value={device.lat}
                onChange={(html) => handleChange(html.target.value, "lat")}
              />
              <span style={{ color: "red" }}>{errors.email}</span>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Longtitude"
                variant="standard"
                fullWidth
                value={device.lon}
                onChange={(html) => handleChange(html.target.value, "lon")}
              />
              <span style={{ color: "red" }}>{errors.password}</span>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="จำนวนของ Relay"
                variant="standard"
                fullWidth
                value={device.relays}
                onChange={(html) => handleChange(html.target.value, "relays")}
              />
              <span style={{ color: "red" }}>{errors.password}</span>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="hasCamera (ใส่ 0 หรือ 1)"
                variant="standard"
                fullWidth
                value={device.hasCamera}
                onChange={(html) => handleChange(html.target.value, "hasCamera")}
              />
              <span style={{ color: "red" }}>{errors.password}</span>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="hasSoilmodel (ใส่ 0 หรือ 1)"
                variant="standard"
                fullWidth
                value={device.hasSoilModel}
                onChange={(html) => handleChange(html.target.value, "hasSoilModel")}
              />
              <span style={{ color: "red" }}>{errors.password}</span>
            </MDBox>

          </MDBox>
        </MDBox>
        <MDBox p={2} mt={-3} mb={1}>
          <MDButton
            type="submit"
            variant="gradient"
            color="info"
            fullWidth
            onClick={() => onSave()}
          >
            บันทึก
          </MDButton>
        </MDBox>

      </Card>
    </DashboardLayout>

  );
}
export default inject("deviceStore")(observer(Cover));
