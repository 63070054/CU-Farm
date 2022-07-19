import React, { useState } from "react";
import PropTypes from "prop-types";
import { observer, inject } from 'mobx-react';
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Switch from "@mui/material/Switch";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import drop from "assets/images/drop.png";
import soil from "assets/images/soil.png";
import thermometer from "assets/images/thermometer.png";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import { useLocation } from "react-router-dom";
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
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Swal from "sweetalert2";

import { Container, Row, Col, Button, Form } from "react-bootstrap";

function addSensor(props) {
  const location = useLocation();

  const [relayAutoState, setAutoRelayState] = useState([
    { device_id: location.state.device_id, name: "", abstract: "", param: "", unit: "", type: "" },
  ]);

  const handleAddRelayAuto = () => {
    const values = [...relayAutoState];
    values.push({
      device_id: location.state.device_id,
      name: "",
      abstract: "",
      param: "",
      unit: "",
      type: ""
    });
    setAutoRelayState(values);
  };

  const navigate = useNavigate();

  const handleRemovePlayers = (index) => {
    const values = [...relayAutoState];
    values.splice(index, 1);
    setAutoRelayState(values);
  };


  const handleInputChange = (index, event) => {

    const values = [...relayAutoState];
    const updatedValue = event.target.name;
    values[index][updatedValue] = event.target.value;
    setAutoRelayState(values);
  };

  // relayAutoState.filter(relay => relay.relay_id)

  const onSave = async () => {

    const status = await props.sensorStore.addSensor(relayAutoState)

    if (status === 200) {
      Swal.fire("Success", "add sensors success", "success").then(function () {
        // Redirect the user
        window.location.href = "/listDevice";
      });
    } else {
      Swal.fire("Waring", "failed to add sensor", "failed")
    }
  }

  useEffect(() => {

  })


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
            การเพิ่มอุปกรณ์หน้าที่ 3
          </MDTypography>

        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <Container>
            <Row className="justify-content-center">
              <Col xs="6" className="dynamic-form-headings">

              </Col>
              <Col xs="12">
                <Form>
                  <Row className="justify-content-center">
                    {relayAutoState.length >= 0 && (
                      <>
                        {relayAutoState.map((field, index) => (

                          <Col xs="4">
                            <div className="add-player-div">
                              <MDTypography display="block" variant="button">Sensor {index + 1}</MDTypography>
                              <MDBox component="form" role="form">
                                <MDBox mb={2}>
                                  <MDInput
                                    type="text"
                                    label="Name"
                                    variant="standard"
                                    fullWidth
                                    name='name'
                                    value={relayAutoState.name}
                                    onChange={(value) => handleInputChange(index, value)}
                                  />
                                </MDBox>
                                <MDBox mb={2}>
                                  <MDInput
                                    type="text"
                                    label="abstract"
                                    variant="standard"
                                    fullWidth
                                    name="abstract"
                                    value={relayAutoState.abstract}
                                    onChange={(value) => handleInputChange(index, value)}
                                  />
                                </MDBox>
                                <MDBox mb={2}>
                                  <MDInput
                                    type="text"
                                    label="param"
                                    variant="standard"
                                    fullWidth
                                    name="param"
                                    value={relayAutoState.param}
                                    onChange={(value) => handleInputChange(index, value)}
                                  />
                                </MDBox>
                                <MDBox mb={2}>
                                  <MDInput
                                    type="text"
                                    label="unit"
                                    variant="standard"
                                    fullWidth
                                    name="unit"
                                    value={relayAutoState.unit}
                                    onChange={(value) => handleInputChange(index, value)}
                                  />
                                </MDBox>
                                <MDBox mb={2}>
                                  <MDInput
                                    type="text"
                                    label="type"
                                    variant="standard"
                                    fullWidth
                                    name="type"
                                    value={relayAutoState.type}
                                    onChange={(value) => handleInputChange(index, value)}
                                  />
                                </MDBox>
                              </MDBox>
                              <MDButton mt={2}
                                variant="gradient" color="primary" fullWidth
                                onClick={() => handleRemovePlayers(index)}
                              >
                                ลบ
                              </MDButton>

                            </div>
                          </Col>
                        ))}
                        <MDButton mt={2} mb={2} variant="gradient" fullWidth color="info" onClick={() => handleAddRelayAuto()}>
                          เพิ่ม sensor
                        </MDButton>
                        <MDButton mt={2} mb={2} variant="gradient" fullWidth color="success" onClick={() => onSave()}>
                          บันทึก
                        </MDButton>
                      </>

                    )}
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container >
        </MDBox>

      </Card>
    </DashboardLayout>


  );
}

export default inject("sensorStore")(observer(addSensor));
