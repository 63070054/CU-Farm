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

//import { useState } from "react";

// react-router-dom components

// @mui material components
import Card from "@mui/material/Card";
//import Switch from "@mui/material/Switch";
// import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { observer, inject } from 'mobx-react';
import { useEffect, useState } from 'react';
import auth from "utilis/auth";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";


function Basic(props) {
  //const [rememberMe, setRememberMe] = useState(false);

  //const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const navigate = useNavigate();
  const { Loading, errorMessage } = props.authStore.toJS();
  const handleSetCitizenID = (e) => {
    props.authStore.setCitizenID(e.target.value);
  };

  const handleSetBirthdate = (e) => {
    props.authStore.setBirthdate(e.target.value);
  };

  const handleLogin = async () => {
    const response  = await props.authStore.login();

    if (response.status === 200) {
      navigate("/dashboard")
    } else {
      await Swal.fire("Error", "ไม่พบผู้ใช้งานนี้", "error");
    }
  };


  useEffect(() => {
    if (auth.isAuthenticated()) {
      navigate("/dashboard")
    }
    props.authStore.setError();

    // auth.signOutAndClear();
  }, []);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1} href="/pages/profile/profile-overview">
            เข้าสู่ระบบ
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDTypography variant="button" color="text">
              รหัสบัตรประชาชน{" "}</MDTypography>
            <MDBox mb={2}>
              <MDInput type="Text" fullWidth onChange={handleSetCitizenID} />
            </MDBox>
            <MDTypography variant="button" color="text">
              วัน/เดือน/ปีเกิด{" "}</MDTypography>
            <MDBox mb={2}>
              <MDInput type="date" fullWidth onChange={handleSetBirthdate} />
            </MDBox>
            {errorMessage && (
              <span className="text-danger">
                {errorMessage}
              </span>
            )}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleLogin}>
                เข้าสู่ระบบ
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                ลงทะเบียนสำหรับผู้ใช้ใหม่{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  ลงทะเบียน
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default inject("authStore")(observer(Basic));

