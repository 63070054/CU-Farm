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
import Button from '@mui/material/Button';
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
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// @mui material components
import axios from "axios";
import config from '../../../../config/config'
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
import { useNavigate, useLocation } from "react-router-dom";
import { StyledEngineProvider } from '@mui/material/styles';
import _ from 'lodash';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FForm from './form'
import Tooltip from "@mui/material/Tooltip";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import EditModal from 'layouts/EditModal'
import EditModalRelay from 'layouts/edit-modal-relay'
import EditModalSensor from 'layouts/edit-modal-sensor'
import Map from "../../../../layouts/map/m"
import Swal from "sweetalert2";

function ComplexCard({ color }) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [timeStart, setTimeStart] = useState([]);
  const [timeStop, setTimeStop] = useState([]);
  // const [activeItem, setActiveItem] = useState(isSelected);
  const [age, setAge] = useState('');
  const [criteriaTopic, setcriteriaTopic] = useState([]);
  const [criteriaCondition, setcriteriaCondition] = useState([]);
  const [criteriaValue, setcriteriaValue] = useState([]);
  const [relayId, setRelayId] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = (deviceDetail) => {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const [openSensor, setOpenSensor] = useState(false);
  const handleOpenSensor = (sensor, index) => {

    setOpenSensor(true);
    setSensorDetail(sensor)
    setSensorId(index)
  }
  const handleCloseSensor = () => setOpenSensor(false);
  const [relayDetail, setRelayDetail] = useState(null);
  const [sensorDetail, setSensorDetail] = useState(null);
  const [sensorId, setSensorId] = useState(null);

  const [openRelay, setOpenRelay] = useState(false);
  const [relayIdModal, setRelayIdModal] = useState(null)
  const handleOpenRelay = (relay) => {
    setOpenRelay(true);
    setRelayDetail(relay)
  }

  const handleCloseRelay = () => setOpenRelay(false);


  const generateFirstStageDevice = () => {

    return ({
      device_id: location.state.device.count,
      name: location.state.device.name,
      user: location.state.device.user,
      abstract: location.state.device.abstract,
      lat: location.state.device.lat,
      lon: location.state.device.lon,
      sleepTime1: location.state.device.sleepTime1,
      sleepHours1: location.state.device.sleepHours1,
      sleepTime2: location.state.device.sleepTime2,
      sleepHours2: location.state.device.sleepHours2,
    })

  }
  useEffect(() => {

    console.log(location.state.sensors)

    const generateFirstStageSensor = () => {
      return location.state.sensors.map((sensor, index) => ({
        id: sensor.id,
        device_id: sensor.device_id,
        name: sensor.name,
        abstract: sensor.abstract,
        param: sensor.param,
        unit: sensor.unit,
        type: sensor.type,
        remark: sensor.remark,
        key: index
      })
      )
    }
    setSensorState(generateFirstStageSensor())

    console.log("test : " + generateFirstStageSensor())

    // let color = 
    // let title =
    // let count =
    // let percentage =
    // let icon =
    // let setExpand =
    // let isExpand =
    // let setDelete =
    // let sensors =
    // let relays =
    // let isSelected =
    // let parentCallback =
    // let relayAuto =
    // let influxsensors =
    // let model_soil = 
    // const generateFirstStageDevice = () => {
    //   return ({
    //     device_id: location.state.device.device_id
    //     name: location.state.device.name
    //     user: location.state.device.user,
    //     abstract: location.state.device.abstract,
    //     lat: location.state.device.lat,
    //     lon: location.state.device.lon,
    //     sleepTime1: location.state.device.sleepTime1,
    //     sleepHours1: location.state.device.sleepHours1,
    //     sleepTime2: location.state.device.sleepTime2,
    //     sleepHours2: location.state.device.sleepHours2,
    //   })

    // }
    // setDeviceState(generateFirstStageDevice())
  }, [])

  const generateFirstStage = () => {
    return location.state.relays.map((relay, index) => ({
      relay_id: relay.relay_id,
      device_id: relay.device_id,
      name: relay.name,
      abstract: relay.abstract,
      mode: relay.mode,
      status: relay.status,
      remark: relay.remark,
      key: index
    })
    )
  }

  const [relayState, setRelayState] = useState(generateFirstStage())
  // const [deviceState, setDeviceState] = useState({})
  const [deviceState, setDeviceState] = useState(generateFirstStageDevice())
  const [sensorState, setSensorState] = useState([])

  //const [relayState, setRelayState] = useState("")
  const [relayData, setRelayData] = useState()


  const handleCallbackModalRelay = async (childData) => {
    handleCloseRelay()
    try {

      const response = await axios.put(`${config.backendUrl}/editRelay/${childData.device_id}`,
        childData
      );

      if (response.status === 200) {

        let newRelayArr = [...relayState]

        let editedRelay = newRelayArr.find(relay => relay.relay_id === childData.relay_id)
        editedRelay.name = childData.name
        editedRelay.abstract = childData.abstract

        setRelayState(newRelayArr)

        await Swal.fire("Success", "edit relay success", "success");

      }
    } catch (err) {
      await Swal.fire("error", "edit relay Failed", "error");
      return err?.response?.data?.message;
    }



  }


  const handleCallbackModalSensor = async (childData) => {
    handleCloseSensor()


    const newRelay = sensorState.map(aSensor => {
      if (aSensor.id === childData.id) {
        aSensor.name = childData.name
        aSensor.abstract = childData.abstract
      }
      return aSensor
    })

    setSensorState(newRelay)
    try {

      const response = await axios.put(`${config.backendUrl}/editSensor/${location.state.device.device_id}`,
        childData
      );

      if (response.status === 200) {
        await Swal.fire("Success", "edit sensor success", "success");

      }
    } catch (err) {

      return err?.response?.data?.message;
    }

  }

  const handleCallbackModalDevice = async (childData) => {
    handleClose()

    const newRelay = {
      name: childData.name,
      abstract: childData.abstract,
      lat: childData.lat,
      lon: childData.lon,
      sleepTime1: childData.sleepTime1,
      sleepHours1: childData.sleepHours1,
      sleepTime2: childData.sleepTime2,
      sleepHours2: childData.sleepHours2,
    }
    try {

      const response = await axios.put(`${config.backendUrl}/editDevice/${deviceState.device_id}`,
        newRelay
      );

      if (response.status === 200) {
        await Swal.fire("Success", "edit device success", "success");
      }
    } catch (err) {
      await Swal.fire("error", "edit device Failed", "error");
      return err?.response?.data?.message;
    }

    setDeviceState(newRelay)

  }

  useEffect(() => {


    if (location.state.relayAuto.length > 0) {
      const initialRelayId = location.state.relayAuto.map(obj => obj.relay_id);
      setRelayId(initialRelayId);
      // const initialState = relays.map(obj => obj.mode);
      // setRelaySelects(initialState);
      // const initialSwitch = relays.map(obj => ({ status: obj.status, relay_id: obj.relay_id }));
      // setManualSwitches(initialSwitch);
      const initialTimeStart = location.state.relayAuto.map(obj => obj.timeStart);
      setTimeStart(initialTimeStart);
      const initialTimeStop = location.state.relayAuto.map(obj => obj.timeStop);
      setTimeStop(initialTimeStop);
      const initialCriteriaTopic = location.state.relayAuto.map(obj => obj.criteriaTopic);
      setcriteriaTopic(initialCriteriaTopic);
      const initialCriteriaCon = location.state.relayAuto.map(obj => obj.criteriaCondition);
      setcriteriaCondition(initialCriteriaCon);
      const initialCriteriaValue = location.state.relayAuto.map(obj => obj.criteriaValue);
      setcriteriaValue(initialCriteriaValue);
    }
  }, [location.state.relayAuto])

  const handleSelect = (index, value) => {
    const newRelay = [...relayState]
    newRelay[index].mode = value;

    setRelayState(newRelay);
  };

  const handleSelectSwitch = (index) => {
    const newRelay = [...relayState]
    newRelay[index].status = newRelay[index].status == 1 ? 0 : 1;
    setRelayState(newRelay);
  };

  const handleSetTimeStart = (value, itemId) => {

    const newItems = [...timeStart];

    newItems[itemId] = value;

    setTimeStart(newItems);
  };

  const handleSetTimeStop = (value, itemId) => {

    const newItems = [...timeStop];

    newItems[itemId] = value;

    setTimeStop(newItems);
  };


  const handleSetCriteriaTopic = (value, itemId) => {
    // eslint-disable-next-line react/destructuring-assignment
    const newItems = [...criteriaTopic];

    newItems[itemId] = value;

    setcriteriaTopic(newItems);
  };

  const handleSetCriteriaCondition = (value, itemId) => {
    // eslint-disable-next-line react/destructuring-assignment
    const newItems = [...criteriaCondition];

    newItems[itemId] = value;

    setcriteriaCondition(newItems);
  };





  const handleSetCriteriaValue = (value, itemId) => {
    // eslint-disable-next-line react/destructuring-assignment
    const newItems = [...criteriaValue];

    newItems[itemId] = value;

    setcriteriaValue(newItems);
  };

  const addFields = () => {
    let object = {
      timeStart: '',
      timeStop: ''
    }

    setFormFields([...formFields, object])

  }

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }







  const submit = (e) => {
    e.preventDefault();

  }




  // const [relayData, setRelayData] = useState()
  // const handleCallback = (relayAuto) => {
  //   
  //   setRelayData({ relayData: { relayAuto, formFields: { relaySelects, manualSwitches } } })
  // }

  // const onTrigger = (data) => {
  //   
  //   parentCallback(data);
  // }


  const [isExpandControl, setExpandControl] = useState(false)
  const handleCallback = (relayAutos) => {


    if (relayData && relayData.relayData.relayAuto) {
      const newRelayAuto = relayData.relayData.relayAuto.filter(relayAuto => relayAuto.relay_id != relayAutos[0].relay_id)
      newRelayAuto.push(...relayAutos)
      setRelayData({ relayData: { relayAuto: newRelayAuto, relays: relayState } })
    } else {
      setRelayData({ relayData: { relayAuto: relayAutos, relays: relayState } })
    }
  }

  const handleIsExpandedControl = () => {

    //ทำการเช็คด้วยว่าการส่งค่า mqtt สำเร็จมั้ย ถ้าสำเร็จ alert success ไม่สำเร็จ alert fail และ alert เตือนว่าไม่ได้เซฟ
    setExpandControl(!isExpandControl)

  };
  const onTrigger = (data) => {

    parentCallback(data);
  }

  const handleReport = (relay) => {

    navigate('/report', {
      state: {
        relay
      }
    })
  }

  const handleSensors = (sensor) => {
    navigate('/reportSensor', {
      state: {
        sensor
      },

    })
  }
  const index = 1


  const removeUserDevice = async (device_id) => {
    const status = await props.deviceStore.removeUserDevice(device_id);

    // if (status === 200) {
    //   const { user_device } = props.authStore.toJS();
    //   await props.authStore.login(user_device.user.ID, user_device.user.birth)
    // }
    if (status === 200) {
      Swal.fire("Success", "delete device success", "success");
    } else {
      Swal.fire("Success", "delete device success", "success");
      const { user_device } = props.authStore.toJS();
      await props.authStore.login(user_device.user.ID, user_device.user.birth)
    }

  };


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Map map={location.state.device} />
      <MDBox py={3} >
        <Card>
          <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
            <MDBox
              variant="gradient"
              bgColor={color}
              color={color === "light" ? "dark" : "white"}
              coloredShadow={color}
              borderRadius="xl"
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="4rem"
              height="4rem"
              mt={-3}
            >
              <Icon fontSize="medium" color="inherit">
                {location.state.icon}
              </Icon>
            </MDBox>
            <MDBox textAlign="right" lineHeight={1.25}>
              <MDTypography variant="h6" fontWeight="light" color="text">
                {deviceState.name}
              </MDTypography>
              <MDTypography variant="button">{location.state.count}</MDTypography>
            </MDBox>
          </MDBox>
          <Divider />

          <MDBox display="flex" p={2} textAlign="left" lineHeight={1.25}>
            <MDTypography variant="h6" fontWeight="light" color="text">
              {deviceState.abstract}
            </MDTypography>

            <MDButton onClick={() => handleOpen()} >
              <Icon >edit</Icon>
            </MDButton>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <EditModal device={deviceState} callback={handleCallbackModalDevice} />
            </Modal>
          </MDBox>
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Sensor</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <MDBox display="flex" textAlign="left" lineHeight={1.25}>
                  <MDTypography variant="h6" fontWeight="light" color="text">
                    ค่าแนะนำการรดน้ำ
                  </MDTypography>
                  {/* <MDButton onClick={() => handleOpenSensor()} >
                    <Icon >edit</Icon>
                  </MDButton> */}

                </MDBox> <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                  <MDBox mr={2}>
                    <MDBox component="img" src={soil} alt="master card" width="20%" mt={1} />
                  </MDBox>


                  <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                    <MDTypography variant="caption" fontWeight="medium">
                      {location.state.model_soil.data.humid}32.4%
                    </MDTypography>
                  </MDBox>

                  {/* <Modal
                    open={openSensor}
                    onClose={handleCloseSensor}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <EditModalSensor sensor={location.state.sensors} callback={handleCallbackModalSensor} />
                  </Modal> */}
                </MDBox>
                {sensorState.map((sensorName, index) => {

                  return (
                    <>

                      <MDTypography display="flex" variant="h6" fontWeight="medium" color="dark">
                        <MDTypography variant="button" color="black">
                          sensor ที่  &nbsp;{index + 1}  : &nbsp;
                        </MDTypography>
                        <MDTypography variant="h6" fontWeight="medium" color="dark">
                          <MDTypography mb={1} variant="button" color="dark">
                            &nbsp; {sensorName.name}
                          </MDTypography>
                          <MDButton onClick={() => handleOpenSensor(sensorName, sensorName.id)} >
                            <Icon m={-1} >edit</Icon>
                          </MDButton>
                        </MDTypography>



                        < MDTypography m={0.5} variant="button" color="success" >
                          {location.state.influxsensors[location.state.index].sensors[0][sensorName.param]}
                        </MDTypography>
                      </MDTypography>
                    </>
                  )
                })}
                <Modal
                  open={openSensor}
                  onClose={handleCloseSensor}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <EditModalSensor sensor={sensorDetail} callback={handleCallbackModalSensor} sensorIndex={sensorId} />
                </Modal>
                <MDButton variant="gradient" color="success" fullWidth onClick={() => handleSensors(location.state.sensors)} >
                  กราฟแสดงข้อมูลของ sensors
                </MDButton>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Control</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <>

                  {relayState && (relayState).map((relay, index) => (
                    <>
                      <MDBox display="flex" textAlign="left" >
                        <MDTypography display="block" variant="button" >
                          {relay.name} :
                        </MDTypography>
                        <MDButton onClick={() => handleOpenRelay(relay)} >
                          <Icon >edit</Icon>
                        </MDButton>
                      </MDBox>
                      {relay.mode == 0 ? <>
                        <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                          <MDTypography ml={{ xs: 1.5, sm: 0 }} display="block" variant="button" >
                            ทำงานแบบควบคุมเอง
                          </MDTypography>&nbsp;
                          <MDButton display="block" variant="button" key={index} onClick={() => handleSelect(index, 1)}>
                            (คลิกเพื่อเปลี่ยน)
                          </MDButton></MDBox>
                        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
                          <MDBox mt={0.5}>
                            <Switch checked={relay.status} key={index} onClick={() => handleSelectSwitch(index)} />
                          </MDBox></MDBox>
                      </> :
                        <>

                          <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                            <MDTypography ml={{ xs: 1.5, sm: 0 }} display="block" variant="button" >
                              ทำงานแบบอัตโนมัติ
                            </MDTypography>&nbsp;
                            <MDButton display="block" variant="button" key={index} onClick={() => handleSelect(index, 0)}>
                              (คลิกเพื่อเปลี่ยน)
                            </MDButton></MDBox>



                          <div className="">


                            <FForm
                              relay={relay}
                              childCallback={handleCallback}
                              sensors={location.state.sensors}
                              relayAuto={location.state.relayAuto}
                            />
                          </div>
                        </>
                      }
                    </>
                  ))}
                  <Modal
                    open={openRelay}
                    onClose={handleCloseRelay}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <EditModalRelay relay={relayDetail} callback={handleCallbackModalRelay} />
                  </Modal>
                  <MDBox mb={2}>
                    <MDButton variant="gradient" color="info" fullWidth onClick={() => onTrigger(relayData)}>
                      ส่งคำสั่ง
                    </MDButton>
                  </MDBox>
                  <MDButton variant="gradient" color="success" fullWidth onClick={() => handleReport(location.state.relays)} >
                    กราฟแสดงข้อมูลของ Relay
                  </MDButton>
                </>
              </AccordionDetails>
            </Accordion>
            <Accordion >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>Camera</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <MDButton variant="gradient" color="primary" fullWidth onClick={() => removeUserDevice(location.state.relays.device_id)}>
                  ลบอุปกรณ์
                </MDButton>
              </AccordionDetails>
            </Accordion>
          </div>
        </Card>
      </MDBox>
    </DashboardLayout >
  );
}

// Typechecking props for the ComplexCard

export default inject("relayStore")(observer(ComplexCard));
