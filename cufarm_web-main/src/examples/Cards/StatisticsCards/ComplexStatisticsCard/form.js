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

import { Container, Row, Col, Button, Form } from "react-bootstrap";

function formm({ relay, childCallback: returnThisToParent, sensors, relayAuto }) {

  const [timeStart, setTimeStart] = useState([]);
  const [timeStop, setTimeStop] = useState([]);
  const [criteriaTopic, setcriteriaTopic] = useState([]);
  const [criteriaCondition, setcriteriaCondition] = useState([]);
  const [criteriaValue, setcriteriaValue] = useState([]);

  const generateFirstStage = () => {
    return relayAuto.data.filter(relayauto => relayauto.relay_id === relay.relay_id).map(obj => ({
      relay_id: relay.relay_id,
      device_id: relay.device_id,
      criteriaCondition: obj.criteria.split(' ')[1],
      criteriaTopic: obj.criteria.split(' ')[0],
      criteriaValue: obj.criteria.split(' ')[2],
      timeStart: obj.from_time,
      timeStop: obj.to_time,
    })
    )

  }
  const [relayAutoState, setAutoRelayState] = useState(generateFirstStage())



  const onClickSaveRelayAuto = (data) => {

    returnThisToParent(data);
  }

  const handleAddRelayAuto = () => {
    const values = [...relayAutoState];
    values.push({
      relay_id: relay.relay_id,
      device_id: relay.device_id,
      criteriaCondition: "",
      criteriaTopic: "",
      criteriaValue: "",
      timeStart: Date,
      timeStop: Date,
    });
    setAutoRelayState(values);
  };

  const handleRemovePlayers = (index) => {
    const values = [...relayAutoState];
    values.splice(index, 1);
    setAutoRelayState(values);
    onClickSaveRelayAuto(values)
  };

  const handleTimeStart = (index, event) => {
    const values = [...relayAutoState];
    values[index]['timeStart'] = event;

    setAutoRelayState(values);
    onClickSaveRelayAuto(relayAutoState)

  };

  const handleTimeStop = (index, event) => {
    const values = [...relayAutoState];
    values[index]['timeStop'] = event;

    setAutoRelayState(values);
    onClickSaveRelayAuto(relayAutoState)

  };


  const handleInputChange = (index, event) => {
    const values = [...relayAutoState];
    const updatedValue = event.target.name;
    values[index][updatedValue] = event.target.value;

    setAutoRelayState(values);
    // values[index]['relay_id'] = index;
    // setAutoRelayState(values);
    onClickSaveRelayAuto(relayAutoState)
  };

  // relayAutoState.filter(relay => relay.relay_id)
  return (
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
                        <MDTypography display="block" variant="button">ช่วงเวลาทำงานที่ {index + 1}</MDTypography>
                        <MDBox display="flex" alignItems="center" mt={{ xs: 1, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                              inputFormat="E MMM dd yyyy HH:MM:SS O"
                              value={field.timeStart}
                              onChange={(event) =>
                                handleTimeStart(index, event)
                              }
                              renderInput={(params) => <TextField {...params} />}
                            />
                            &nbsp;<MDTypography display="block" variant="button" >
                              ถึง
                            </MDTypography>&nbsp;
                            <TimePicker

                              value={field.timeStop}
                              onChange={(event) =>
                                handleTimeStop(index, event)
                              }
                              renderInput={(params) => <TextField {...params} />}
                            />

                          </LocalizationProvider></MDBox>
                        <MDTypography display="block" variant="button" >
                          ให้เปิดเมื่อ
                        </MDTypography>
                        <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>

                          <FormControl sx={{ m: 1, minWidth: 80 }}>
                            <Select
                              labelId="demo-simple-select-autowidth-label"
                              id="demo-simple-select-autowidth"
                              value={field.criteriaTopic}
                              name="criteriaTopic"
                              onChange={(value) => handleInputChange(index, value)}
                              autoWidth
                            >
                              <MenuItem value="None">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={'เปิดตลอดเวลา'}>เปิดตลอดเวลา</MenuItem>
                              {(sensors).map((sensorName) => {
                                return (
                                  //   <>
                                  <MenuItem value={sensorName.param}>{sensorName.param}</MenuItem>
                                  //   </>
                                )
                              })}
                            </Select>
                          </FormControl>
                          <FormControl sx={{ m: 1, minWidth: 80 }}>
                            <Select
                              labelId="demo-simple-select-autowidth-label"
                              id="demo-simple-select-autowidth"
                              value={field.criteriaCondition}
                              name="criteriaCondition"
                              onChange={(value) => handleInputChange(index, value)}
                              autoWidth
                            >
                              <MenuItem value="None">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={10}>น้อยกว่า</MenuItem>
                              <MenuItem value={21}>มากกว่า</MenuItem>
                            </Select>
                          </FormControl>

                          <TextField id="outlined-basic" placeholder="กรุณาใส่ค่า sensor" name="criteriaValue" value={field.criteriaValue} variant="outlined" onChange={(value) => handleInputChange(index, value)} />

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
                  <MDButton mt={2} mb={4} variant="gradient" fullWidth color="info" onClick={() => handleAddRelayAuto()}>
                    เพิ่มการตั้งค่าใหม่
                  </MDButton>
                </>

              )}
            </Row>
          </Form>
        </Col>
      </Row>
    </Container >
  );
}

export default formm;