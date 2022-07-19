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

import { useState } from "react";
import PageLayout from "examples/LayoutContainers/PageLayout";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDInput from "components/MDInput";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function DeviceConfig() {
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const alertContent = (name) => (
    <MDTypography variant="body2" color="white">
      A simple {name} alert with{" "}
      <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        an example link
      </MDTypography>
      . Give it a click if you like.
    </MDTypography>
  );

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const renderWarningSB = (
    <MDSnackbar
      color="warning"
      icon="star"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={warningSB}
      onClose={closeWarningSB}
      close={closeWarningSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  return (
    <DashboardLayout>
      <MDBox width="80vw" height="100%" minHeight="100vh" sx={{ overflowX: "hidden" }}>
        <MDBox width="40vh" minHeight="40vh" borderRadius="xl" mx={2} my={2} pt={6} pb={28} />
        <MDBox mt={{ xs: -20, lg: -18 }} px={1} width="calc(100% - 2rem)" mx="auto">
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
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
                    รหัสบัตรประชาชนของคุณ :{" "}
                  </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                  <MDBox component="form" role="form">
                    <MDTypography display="block" variant="button" color="ิblack">
                      รหัสอุปกรณ์ของกล่อง{" "}
                    </MDTypography>
                    <MDBox mb={4}>
                      <MDInput type="email" label="Email" variant="standard" fullWidth />
                    </MDBox>
                    <MDBox mt={6} mb={1}>
                      <MDButton variant="gradient" color="info" fullWidth>
                        เพิ่มอุปกรณ์
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default DeviceConfig;
