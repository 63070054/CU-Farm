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
import ComplexCard from "examples/Cards/StatisticsCards/ComplexCard";


function ComplexStatisticsCard({ index, color, title, count, percentage, icon, setExpand, isExpand, setDelete, sensors, relays, isSelected, parentCallback, relayAuto, influxsensors, model_soil, device }) {
  const navigate = useNavigate();
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [timeStart, setTimeStart] = useState([]);
  const [timeStop, setTimeStop] = useState([]);
  const [activeItem, setActiveItem] = useState(isSelected);
  const [age, setAge] = useState('');
  // const [relaySelects, setRelaySelects] = useState([]);
  // const [manualSwitches, setManualSwitches] = useState([]);
  const [criteriaTopic, setcriteriaTopic] = useState([]);
  const [criteriaCondition, setcriteriaCondition] = useState([]);
  const [criteriaValue, setcriteriaValue] = useState([]);
  const [relayId, setRelayId] = useState([]);

  const generateFirstStage = () => {
    return relays.map(relay => ({
      relay_id: relay.relay_id,
      device_id: relay.device_id,
      name: relay.name,
      abstract: relay.abstract,
      mode: relay.mode,
      status: relay.status,
      remark: relay.remark,
    })
    )
  }
  const [relayState, setRelayState] = useState(generateFirstStage())




  useEffect(() => {
    if (relayAuto.length > 0) {
      const initialRelayId = relayAuto.map(obj => obj.relay_id);
      setRelayId(initialRelayId);
      // const initialState = relays.map(obj => obj.mode);
      // setRelaySelects(initialState);
      // const initialSwitch = relays.map(obj => ({ status: obj.status, relay_id: obj.relay_id }));
      // setManualSwitches(initialSwitch);
      const initialTimeStart = relayAuto.map(obj => obj.timeStart);
      setTimeStart(initialTimeStart);
      const initialTimeStop = relayAuto.map(obj => obj.timeStop);
      setTimeStop(initialTimeStop);
      const initialCriteriaTopic = relayAuto.map(obj => obj.criteriaTopic);
      setcriteriaTopic(initialCriteriaTopic);
      const initialCriteriaCon = relayAuto.map(obj => obj.criteriaCondition);
      setcriteriaCondition(initialCriteriaCon);
      const initialCriteriaValue = relayAuto.map(obj => obj.criteriaValue);
      setcriteriaValue(initialCriteriaValue);
    }
  }, [])

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


  const handleDeviceDetail = (user) => {
    //
    navigate('/deviceDetail', {
      state: {
        title,
        count,
        isExpand,
        sensors,
        relays,
        relayAuto,
        icon,
        isSelected,
        influxsensors,
        model_soil,
        device,
        index,
        //parentCallback,
        //setDelete,
        //setExpand


        // percentage, 
        // setExpand, 
        // setDelete, 
        // parentCallback, 

      }
    })

    return (
      <>
        <ComplexCard
          color="dark"
          // icon="weekend"
          // color="dark"
          // title={user.title}
          // count={user.count}
          // setExpand={user.setExpand}
          // setDelete={user.setDelete}
          // isExpand={user.isExpand}
          // sensors={user.sensors}
          // relays={user.relays}
          // relayAuto={user.relayAuto}
          // influxsensors={user.influxsensors}
          // model_soil={user.model_soil}
          // device={user.device}
          // index={index}
        />

      </>
    )




  };

  // const [relayData, setRelayData] = useState()
  // const handleCallback = (relayAuto) => {
  //   
  //   setRelayData({ relayData: { relayAuto, formFields: { relaySelects, manualSwitches } } })
  // }

  // const onTrigger = (data) => {
  //   
  //   parentCallback(data);
  // }


  const [relayData, setRelayData] = useState()
  const handleCallback = (relayAutos) => {


    if (relayData && relayData.relayData.relayAuto) {
      const newRelayAuto = relayData.relayData.relayAuto.filter(relayAuto => relayAuto.relay_id != relayAutos[0].relay_id)
      newRelayAuto.push(...relayAutos)
      setRelayData({ relayData: { relayAuto: newRelayAuto, relays: relayState } })
    } else {
      setRelayData({ relayData: { relayAuto: relayAutos, relays: relayState } })
    }
  }

  const onTrigger = (data) => {

    parentCallback(data);
  }
  return (
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
            {icon}
          </Icon>
        </MDBox>
        <MDBox textAlign="right" lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="light" color="text">
            {title}
          </MDTypography>
          <MDTypography variant="button">{count}</MDTypography>
        </MDBox>
      </MDBox>
      <Divider />
      <MDBox pb={2} px={2}>
        <MDButton variant="gradient" color="info" fullWidth onClick={() => handleDeviceDetail({ index, color, title, count, percentage, icon, setExpand, isExpand, setDelete, sensors, relays, isSelected, parentCallback, relayAuto, influxsensors, model_soil, device })}>
          ดูรายละเอียด
        </MDButton>
      </MDBox>



    </Card>

  );
}

// Setting default values for the props of ComplexStatisticsCard
ComplexStatisticsCard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
};

let title = ""

// Typechecking props for the ComplexStatisticsCard
ComplexStatisticsCard.propTypes = {
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

export default inject("relayStore")(observer(ComplexStatisticsCard));
