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
import Card from "@mui/material/Card";
import MDInput from "components/MDInput";
import auth from "utilis/auth";
import { useNavigate, Link } from "react-router-dom";
// Material Dashboard 2 React components
import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import deviceConfig from "layouts/device-config";
import { observer, inject } from "mobx-react";
import { useEffect, useState } from "react";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import _ from 'lodash';
function Notifications(props) {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState([
    { name: '' },
  ])
  const [addDevice, setAddDevice] = useState(false)
  const [sensors, setSensors] = useState([])
  const [relays, setRelays] = useState([])
  const [error, setError] = useState(false)

  const { Loading, errorMessage } = props.deviceStore.toJS();

  const handleSetDeviceID = (e) => {

    props.deviceStore.setDeviceID(e.target.value);

  };

  const handleFormChange = (event, index) => {

    props.deviceStore.handleFormChange(event.target.value, index);

  }

  const handleAddDevice = async () => {
    const { user } = auth.getUserInfo();
    const response = await props.deviceStore.getUserDeviceByID(user);


    if (response.status === 200) {
      setSensors(response.data.data.sensor)
      setRelays(response.data.data.relay)
      setAddDevice(true)
      setError(false)
      //
    } else {
      setError(true)

    }
  };

  const alertContent = (name) => (
    <MDTypography variant="body2" color="white">
      {name} ไม่พบอุปกรณ์ กรุณาเพิ่มอุปกรณ์ใหม่อีกครั้ง
    </MDTypography>
  );



  useEffect(() => {
    if (auth.isAuthenticated()) {
    }
    // props.authStore.setError();
    // auth.signOutAndClear();
  }, []);



  const submit = (e) => {
    e.preventDefault();

    navigate("/dashboard")
  }

  const addFields = () => {
    let object = {
      name: '',
      age: ''
    }

    setFormFields([...formFields, object])
  }

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }

  const { user_device } = props.authStore.toJS();

  if (!user_device.device) {

    auth.signOutAndClear();
    navigate("/authentication/sign-in")
    return false
  };

  console.log(user_device.user.ID)


  return (
    <DashboardLayout>
      <DashboardNavbar></DashboardNavbar>
      {error && <MDAlert color="error" dismissible onClose={() => { console.log('kuy') }}>
        {alertContent("error")}
      </MDAlert>}

      <MDBox width="80vw" height="100%" minHeight="100vh" sx={{ overflowX: "hidden" }}>
        <MDBox width="40vh" minHeight="40vh" borderRadius="xl" mx={2} my={2} pt={6} pb={28} />
        <MDBox mt={{ xs: -20, lg: -18 }} px={1} width="calc(100% - 2rem)" mx="auto">
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>


              {addDevice ? <Card>
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="success"
                  mx={2}
                  mt={-3}
                  py={2}
                  mb={1}
                  textAlign="center"
                >
                  <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
                    เพิ่มกล่องอุปกรณ์
                  </MDTypography>
                  <MDTypography display="block" variant="button" color="white" my={1}>
                    รหัสบัตรประชาชนของคุณ {user_device.user.ID}
                  </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                  <MDBox component="form" role="form">
                    <MDTypography display="block" variant="button" color="ิblack">
                      รหัสอุปกรณ์ของกล่อง{" "}
                    </MDTypography>
                    <MDBox mb={4}>
                      <MDInput type="text" value={props.deviceStore.deviceID} label="กรุณาใส่รหัสอุปกรณ์ของกล่อง" variant="standard" fullWidth />
                    </MDBox>
                    <MDTypography display="block" variant="button" color="ิblack">
                      ชื่อกล่องอุปกรณ์{" "}
                    </MDTypography>
                    <MDBox mb={4}>
                      <MDInput type="text" label="กรุณาใส่รหัสอุปกรณ์ของกล่อง" variant="standard" fullWidth />
                    </MDBox>
                    <MDTypography display="block" variant="button" color="ิblack">
                      คำอธิบาย{" "}
                    </MDTypography>
                    <MDBox mb={4}>
                      <MDInput type="text" label="กรุณาใส่รหัสอุปกรณ์ของกล่อง" variant="standard" fullWidth />
                    </MDBox>
                    <MDTypography mb={2} display="block" variant="h6" fontWeight="medium" color="ิblack">
                      Relays ที่พบในอุปกรณ์ {relays.length}
                    </MDTypography>
                    {relays.map((data, index) => {
                      return (
                        <>
                          <MDTypography display="flex" variant="button" color="dark">
                            <MDTypography variant="button" color="ิblack">
                              relay ที่ {index + 1} &nbsp;
                            </MDTypography>

                          </MDTypography>
                        </>
                      )
                    })}
                    <MDTypography display="block" variant="h6" fontWeight="medium" color="ิblack">
                      Sensors ที่พบในอุปกรณ์ {sensors.length}
                    </MDTypography>
                    {/* {_.keys(sensors[0]).map((sensorName) => {
                      return (
                        <>
                          <MDTypography display="flex" variant="h6" fontWeight="medium" color="dark">
                            <MDTypography variant="button" color="ิblack">
                              {sensorName} &nbsp; : &nbsp;
                            </MDTypography>
                            <MDTypography mb={1} variant="button" color="dark">
                              &nbsp; {sensors[0][`${sensorName}`]}
                            </MDTypography>
                          </MDTypography>
                        </>
                      )
                    })} */}
                    {sensors.map((sensorName, index) => {
                      return (
                        <>
                          <MDTypography display="flex" variant="h6" fontWeight="medium" color="dark">
                            <MDTypography variant="button" color="ิblack">
                              sensor ที่  &nbsp;{index + 1}  : &nbsp;
                            </MDTypography>
                            <MDTypography mb={1} variant="button" color="dark">
                              &nbsp; {sensorName.name}
                            </MDTypography>
                          </MDTypography>
                        </>
                      )
                    })}



                    <MDBox mt={3} mb={1}>
                      <MDButton variant="gradient" color="info" fullWidth onClick={submit}>
                        บันทึก
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </Card> :
                <Card>
                  <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="success"
                    mx={2}
                    mt={-3}
                    py={2}
                    mb={1}
                    textAlign="center"
                  >

                    <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
                      เพิ่มกล่องอุปกรณ์
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                      รหัสบัตรประชาชนของคุณ {user_device.user.ID}
                    </MDTypography>
                  </MDBox>
                  <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" role="form">
                      <MDTypography display="block" variant="button" color="dark">
                        รหัสอุปกรณ์ของกล่อง{" "}
                      </MDTypography>
                      <MDBox mb={4}>
                        <MDInput type="text" value={props.deviceStore.deviceID} label="กรุณาใส่รหัสอุปกรณ์ของกล่อง" variant="standard" fullWidth onChange={handleSetDeviceID} />
                      </MDBox>
                      <MDBox mt={6} mb={1}>
                        <MDButton variant="gradient" color="info" fullWidth onClick={handleAddDevice}>
                          เพิ่มอุปกรณ์
                        </MDButton>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </Card>}
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>

    </DashboardLayout>
  );
}

export default inject("authStore", "deviceStore")(observer(Notifications));


