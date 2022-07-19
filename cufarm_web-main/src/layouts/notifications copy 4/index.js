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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

function Notifications() {
  return (
    <DashboardLayout>
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={11} sm={9} md={5} lg={4} xl={11}>
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
                      <MDInput type="text" label="กรุณาใส่รหัสอุปกรณ์ของกล่อง" variant="standard" fullWidth />
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
                    <MDTypography display="block" variant="button" color="ิblack">
                       ชื่อสวิทช์ที่ 1
                    </MDTypography>
                    <MDBox mb={4}>
                      <MDInput type="text" label="กรุณาใส่ชื่ออุปกรณ์" variant="standard" fullWidth />
                    </MDBox>
                    <MDTypography display="block" variant="button" color="ิblack">
                       ชื่อสวิทช์ที่ 2
                    </MDTypography>
                    <MDBox mb={4}>
                      <MDInput type="text" label="กรุณาใส่ชื่ออุปกรณ์" variant="standard" fullWidth />
                    </MDBox>
                    <MDTypography display="block" variant="button" color="ิblack">
                       ชื่อสวิทช์ที่ 3
                    </MDTypography>
                    <MDBox mb={4}>
                      <MDInput type="text" label="กรุณาใส่ชื่ออุปกรณ์" variant="standard" fullWidth />
                    </MDBox>
                    <MDTypography display="block" variant="button" color="ิblack">
                       ชื่อสวิทช์ที่ 4
                    </MDTypography>
                    <MDBox mb={4}>
                      <MDInput type="text" label="กรุณาใส่ชื่ออุปกรณ์" variant="standard" fullWidth />
                    </MDBox>
                    <MDTypography display="block" variant="button" color="ิblack">
                       ชื่อสวิทช์ที่ 5
                    </MDTypography>
                    <MDBox mb={4}>
                      <MDInput type="text" label="กรุณาใส่ชื่ออุปกรณ์" variant="standard" fullWidth />
                    </MDBox>
                    <MDTypography display="block" variant="button" color="ิblack">
                       ชื่อสวิทช์ที่ 6
                    </MDTypography>
                    <MDBox mb={4}>
                      <MDInput type="text" label="กรุณาใส่ชื่ออุปกรณ์" variant="standard" fullWidth />
                    </MDBox>
                    <MDTypography display="block" variant="button" color="ิblack">
                       ชื่อสวิทช์ที่ 7
                    </MDTypography>
                    <MDBox mb={4}>
                      <MDInput type="text" label="กรุณาใส่ชื่ออุปกรณ์" variant="standard" fullWidth />
                    </MDBox>
                    <MDTypography display="block" variant="button" color="ิblack">
                       ชื่อสวิทช์ที่ 8
                    </MDTypography>
                    <MDBox mb={4}>
                      <MDInput type="text" label="กรุณาใส่ชื่ออุปกรณ์" variant="standard" fullWidth />
                    </MDBox>
                    <MDTypography display="block" variant="button" color="ิblack">
                       ชื่อสวิทช์ที่ 9
                    </MDTypography>
                    <MDBox mb={4}>
                      <MDInput type="text" label="กรุณาใส่ชื่ออุปกรณ์" variant="standard" fullWidth />
                    </MDBox>
                    <MDTypography display="block" variant="button" color="ิblack">
                       ชื่อสวิทช์ที่ 10
                    </MDTypography>
                    <MDBox mb={4}>
                      <MDInput type="text" label="กรุณาใส่ชื่ออุปกรณ์" variant="standard" fullWidth />
                    </MDBox>
                    <MDBox mt={6} mb={1}>
                      <MDButton variant="gradient" color="info" fullWidth>
                        บันทึก
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
    </DashboardLayout>
  );
}

export default Notifications;
