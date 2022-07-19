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
import FForm from './form'
function ComplexStatisticsCard({ color, title, count, percentage, icon, setExpand, isExpand, setDelete, sensors, relays, isSelected }) {
  const navigate = useNavigate();
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [timeStart, setTimeStart] = useState([]);
  const [timeStop, setTimeStop] = useState([]);
  const [activeItem, setActiveItem] = useState(isSelected);
  const [age, setAge] = useState('');
  const [relaySelects, setRelaySelects] = useState([]);
  const [manualSwitches, setManualSwitches] = useState([]);
  const [criteriaTopic, setcriteriaTopic] = useState([]);
  const [criteriaCondition, setcriteriaCondition] = useState([]);
  const [criteriaValue, setcriteriaValue] = useState([]);
  const [formFields, setFormFields] = useState([
    { timeStart, timeStop },
  ])
  useEffect(() => {
    if (relays.length > 0) {
      const initialState = relays.map(obj => obj.isSelect);
      setRelaySelects(initialState);
      const initialSwitch = relays.map(obj => obj.isOff);
      setManualSwitches(initialSwitch);
      const initialTimeStart = relays.map(obj => obj.timeStart);
      setTimeStart(Date);
      const initialTimeStop = relays.map(obj => obj.timeStop);
      setTimeStop(Date);
      const initialCriteriaTopic = relays.map(obj => obj.criteriaTopic);
      setcriteriaTopic("");
      const initialc = relays.map(obj => obj.criteriaCondition);
      setcriteriaCondition("");
      const initialCriteriaValue = relays.map(obj => obj.criteriaValue);
      setcriteriaValue("");
    }
  }, [])

  const handleSelect = (itemId) => {
    const newItems = [...relaySelects];

    newItems[itemId] = !newItems[itemId];

    setRelaySelects(newItems);
  };

  const handleSelectSwitch = (itemId) => {
    const newItems = [...manualSwitches];

    newItems[itemId] = !newItems[itemId];

    setManualSwitches(newItems);
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


    setData(
      [...data].map((object) => {
        if (object.username === user.username) {
          return {
            ...object,
            combinations: [
              ...object.combinations,
              { something: "usefull" }
            ]
          };
        } else return object;
      })
    );

  }

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }







  const submit = (e) => {
    e.preventDefault();

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
      {!isExpand ? <MDBox pb={2} px={2}>
        <MDButton variant="gradient" color="info" fullWidth onClick={setExpand}>
          ดูรายละเอียด
        </MDButton>
      </MDBox>
        :
        <>
          <MDBox width="70vw" height="100%" minHeight="100vh" sx={{ overflowX: "hidden" }}>
            {/* <MDBox width="40vh" minHeight="40vh" borderRadius="xl" mx={2} my={2} pt={6} pb={28} />  */}
            <MDBox mt={{ xs: -20, lg: -18 }} px={1} width="calc(100% - 2rem)" mx="auto">
              <Grid container spacing={2} >
                <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
                  <MDTypography display="block" variant="button" color="dark">
                    คำอธิบาย{" "}
                  </MDTypography>
                  <MDBox mb={12}></MDBox>
                  <MDBox mb={2}>
                    <MDInput type="text" label="กรุณาใส่รหัสอุปกรณ์ของกล่อง" variant="standard" fullWidth />
                  </MDBox>
                  <MDBox mt={2} mb={2}>
                    <MDButton variant="gradient" color="info" fullWidth>
                      แก้ไขชื่อกล่องม ชื่อสวิทช์ และคำอธิบาย
                    </MDButton>
                  </MDBox>
                  <MDBox mt={2} mb={2}>
                    <MDButton variant="gradient" color="error" fullWidth onClick={setDelete}>
                      ลบกล่องออกจากการควบคุม
                    </MDButton>
                  </MDBox>
                  <MDTypography display="block" variant="button" color="dark">
                    สถานะอุปกรณ์ล่าสุด
                  </MDTypography>
                  <Card id="delete-account">

                    <MDBox pt={1} pb={2} px={2}>
                      <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                        <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                          <MDBox mr={15}>
                          </MDBox>
                          <MDBox >
                            <MDTypography variant="caption" fontWeight="medium">
                              Actual&nbsp;&nbsp;Recommend
                            </MDTypography>
                          </MDBox>
                        </MDBox>

                        <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                          <MDBox mr={1}>
                            <MDBox component="img" src={thermometer} alt="master card" width="40%" mt={1} />
                          </MDBox>
                          <MDButton variant="text" color="dark">
                            <MDTypography variant="caption" fontWeight="medium">
                              2C&nbsp;&nbsp;10C
                            </MDTypography>  </MDButton>
                        </MDBox>
                      </MDBox>


                      <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                        <MDBox mr={2}>
                          <MDBox component="img" src={drop} alt="master card" width="40%" mt={1} />

                        </MDBox>
                        <MDButton variant="text" color="dark">

                          <MDTypography variant="caption" fontWeight="medium">
                            0%&nbsp;&nbsp;10%
                          </MDTypography>
                        </MDButton>
                      </MDBox>

                      <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                        <MDBox mr={1}>
                          <MDBox component="img" src={soil} alt="master card" width="40%" mt={1} />

                        </MDBox>
                        <MDButton variant="text" color="dark">

                          <MDTypography variant="caption" fontWeight="medium">
                            0%&nbsp;&nbsp;12%
                          </MDTypography>
                        </MDButton>
                      </MDBox>

                      <MDButton variant="outlined" color="dark" iconOnly circular>
                      </MDButton>&nbsp;&nbsp;

                      <MDButton variant="outlined" color="dark" iconOnly circular >
                      </MDButton>&nbsp;&nbsp;<MDButton variant="outlined" color="dark" iconOnly circular>
                      </MDButton>&nbsp;&nbsp;<MDButton variant="outlined" color="dark" iconOnly circular>
                      </MDButton>&nbsp;&nbsp;<MDButton variant="outlined" color="dark" iconOnly circular>
                      </MDButton>
                    </MDBox>
                  </Card>
                  <MDBox mb={2}></MDBox>

                  {(sensors.length == 0 || relays.length == 0) &&
                    <AppBar position="static">
                      <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                        {/* {(sensors != 0) && */}
                        <Tab
                          label="Sensors"
                        // icon={
                        //   <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        //     email
                        //   </Icon>
                        // }
                        />
                        {/* } */}

                        {/* {(relays != 0) && */}
                        <Tab
                          label="Switches"
                        // icon={
                        //   <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        //     settings
                        //   </Icon>
                        // }
                        />

                        {/* } 
                 */}


                      </Tabs>
                    </AppBar>
                  }



                  {tabValue == 0 ?
                    (<>


                      {_.keys(sensors[0]).map((sensorName) => {
                        return (
                          <>
                            <MDTypography display="block" variant="button" >
                              {sensorName} : {sensors[0][`${sensorName}`]}
                            </MDTypography>
                            <MDBox display="flex" alignItems="center" ml={-1}></MDBox>
                          </>
                        )
                      })}

                    </>) :






                    <>
                      {relays && (relays).map((relay, index) => (
                        <>
                          <MDTypography display="block" variant="button" >
                            Switch ที่ {index + 1} :
                          </MDTypography>

                          {!relaySelects[index] ? <>
                            <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                              <MDTypography display="block" variant="button" >
                                ทำงานแบบควบคุมเอง
                              </MDTypography>&nbsp;
                              <MDButton display="block" variant="button" key={index} onClick={() => handleSelect(index)}>
                                (คลิกเพื่อเปลี่ยน)
                              </MDButton></MDBox>
                            <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
                              <MDBox mt={0.5}>
                                <Switch checked={manualSwitches[index]} key={index} onClick={() => handleSelectSwitch(index)} />
                              </MDBox></MDBox>
                          </> :
                            <>

                              <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                                <MDTypography display="block" variant="button" >
                                  ทำงานแบบอัตโนมัติ
                                </MDTypography>&nbsp;
                                <MDButton display="block" variant="button" key={index} onClick={() => handleSelect(index)}>
                                  (คลิกเพื่อเปลี่ยน)
                                </MDButton></MDBox>
                              <MDTypography display="block" variant="button" >
                                ช่วงเวลา
                              </MDTypography>


                              <div className="">
                                <form onSubmit={submit}>
                                  {formFields.map((form, index) => {
                                    return (
                                      <div key={index}>
                                        <MDBox display="flex" alignItems="center" mt={{ xs: 1, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <TimePicker
                                              name='name'
                                              value={timeStart[index]}
                                              onChange={(value) => handleSetTimeStart(value, index)}
                                              renderInput={(params) => <TextField {...params} />}
                                            />
                                            &nbsp;<MDTypography display="block" variant="button" >
                                              ถึง
                                            </MDTypography>&nbsp;
                                            <TimePicker
                                              name='age'
                                              value={timeStop[index]}
                                              onChange={(value) => handleSetTimeStop(value, index)}
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
                                              // value={criteriaTopic[index]}
                                              //onChange={(value) => handleSetCriteriaTopic(value, index)}
                                              autoWidth
                                            >
                                              <MenuItem value="">
                                                <em>None</em>
                                              </MenuItem>
                                              <MenuItem value={10}>อุณหภูมิ</MenuItem>
                                              <MenuItem value={21}>ความชื้นอากาศ</MenuItem>
                                              <MenuItem value={22}>ความชื้นดิน</MenuItem>
                                              <MenuItem value={23}>เปิดตลอดเวลา</MenuItem>

                                            </Select>
                                          </FormControl>
                                          <FormControl sx={{ m: 1, minWidth: 80 }}>
                                            <Select
                                              labelId="demo-simple-select-autowidth-label"
                                              id="demo-simple-select-autowidth"
                                              // value={criteriaCondition[index]}
                                              // onChange={(value) => handleSetCriteriaCon(value, index)}
                                              autoWidth
                                            >
                                              <MenuItem value="">
                                                <em>None</em>
                                              </MenuItem>
                                              <MenuItem value={10}>น้อยกว่า</MenuItem>
                                              <MenuItem value={21}>มากกว่า</MenuItem>
                                            </Select>
                                          </FormControl>

                                          <TextField id="outlined-basic" variant="outlined" onChange={(value) => handleSetCriteriaValue(value, index)} />

                                        </MDBox>
                                        <MDBox mb={2} mt={2}>
                                          <MDButton color="primary" fullWidth onClick={() => removeFields(index)}>Remove</MDButton></MDBox>
                                      </div>
                                    )
                                  })}
                                </form>
                                <FForm />
                                {/* <button onClick={addFields}>Add More..</button> */}
                                <MDBox mb={2} mt={2}>
                                  <MDButton variant="gradient" color="info" fullWidth onClick={addFields}>
                                    เพิ่ม
                                  </MDButton></MDBox>
                                <br />
                                {/* <button onClick={submit}>Submit</button> */}
                              </div>
                            </>
                          }
                        </>

                      ))}
                      <MDBox mb={2}>
                        <MDButton variant="gradient" color="info" fullWidth >
                          ส่งคำสั่ง
                        </MDButton>
                      </MDBox>
                      <MDButton variant="gradient" color="success" fullWidth onClick={() => navigate("/report")} >
                        กราฟแสดงข้อมูลของ sensors
                      </MDButton>
                    </>

                  }




                  <MDBox mt={3} mb={1}>

                    <MDButton variant="gradient" color="info" fullWidth onClick={setExpand}>
                      ปิดรายละเอียด
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </>
      }

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
