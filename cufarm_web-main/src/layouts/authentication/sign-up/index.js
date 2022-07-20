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
import { useState } from "react";
import Swal from "sweetalert2";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { observer, inject } from "mobx-react";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover(props) {
  // const router = useRouter();
  const navigate = useNavigate();
  const [errors, setError] = useState({
    user: "",
    birth: "",
    name: "",
    address: "",
    email: "",
    tel: "",
    ID: "",
    password: "",
  });

  const handleChange = (html, key) => {
    // eslint-disable-next-line react/destructuring-assignment
    props.userStore.handleChange(html, key);
  };

  const createUser = async () => {
    // eslint-disable-next-line react/destructuring-assignment

    const { user, birth, name, address, tel, email, ID, password } = props.userStore.toJS().data;
    const errMessage = { ...errors };
    // eslint-disable-next-line no-nested-ternary
    errMessage.email = !email
      ? "email should not empty"
      : !email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) && email !== ""
        ? "email is not valid"
        : "";
    if (!user || !birth || !name || !address || !tel || !ID || !password) {
      errMessage.user = !user ? "user should not empty" : "";
      errMessage.birth = !birth ? "birth should not empty" : "";
      errMessage.name = !name ? " Name should not empty" : "";
      errMessage.address = !address ? "address should not empty" : "";
      errMessage.tel = !tel ? "tel should not empty" : "";
      errMessage.ID = !ID ? "tel should not empty" : "";
      errMessage.password = !password ? "tel should not empty" : "";
      setError(errMessage);
      return;
    }
    // 
    // const res = await props.userStore.createUser();
    const res = await props.userStore.createUser();
    if (res && res.status === 200) {
      await Swal.fire("Success", "Register success", "success");
      navigate("/authentication/sign-in")

    } else {
      await Swal.fire("Error", res, "error");
    }
  };

  const { birth, name, address, email, tel, ID, password, user } = props.userStore.toJS().data;


  return (
    <CoverLayout image={bgImage}>
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
            ลงทะเบียนสำหรับผู้ใช้ใหม่
          </MDTypography>

        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="username"
                variant="standard"
                fullWidth
                value={user}
                onChange={(html) => handleChange(html.target.value, "user")}
              />
              <span style={{ color: "red" }}>{errors.user}</span>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="ชื่อ-นาสกุล"
                variant="standard"
                fullWidth
                value={name}
                onChange={(html) => handleChange(html.target.value, "name")}
              />
              <span style={{ color: "red" }}>{errors.name}</span>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="date"
                variant="standard"
                fullWidth
                value={birth}
                onChange={(html) => handleChange(html.target.value, "birth")}
              />
              <span style={{ color: "red" }}>{errors.birth}</span>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="รหัสบัตรประชาชน"
                variant="standard"
                fullWidth
                value={ID}
                onChange={(html) => handleChange(html.target.value, "ID")}
              />
              <span style={{ color: "red" }}>{errors.ID}</span>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="ที่อยู่"
                variant="standard"
                fullWidth
                value={address}
                onChange={(html) => handleChange(html.target.value, "address")}
              />
              <span style={{ color: "red" }}>{errors.address}</span>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="เบอร์โทรติดต่อ"
                variant="standard"
                fullWidth
                value={tel}
                onChange={(html) => handleChange(html.target.value, "tel")}
              />
              <span style={{ color: "red" }}>{errors.tel}</span>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="อีเมล"
                variant="standard"
                fullWidth
                value={email}
                onChange={(html) => handleChange(html.target.value, "email")}
              />
              <span style={{ color: "red" }}>{errors.email}</span>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="รหัสผ่าน"
                variant="standard"
                fullWidth
                value={password}
                onChange={(html) => handleChange(html.target.value, "password")}
              />
              <span style={{ color: "red" }}>{errors.password}</span>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                type="button"
                variant="gradient"
                color="info"
                fullWidth
                onClick={() => createUser()}
              >
                ลงทะเบียน
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                คุณมีบัญชีแล้วหรือไม่ ?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  เข้าสู่ระบบ
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}
export default inject("userStore")(observer(Cover));
