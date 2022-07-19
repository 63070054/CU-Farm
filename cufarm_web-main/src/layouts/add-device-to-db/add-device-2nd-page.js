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
import { useNavigate, Link, useLocation } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import Swal from "sweetalert2";

import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { observer, inject } from "mobx-react";
// Authentication layout components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

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



  const location = useLocation();


  const generateFirstStage = () => {
    return Array.from(Array(location.state.relays), (relay, index) => ({
      device_id: location.state.device_id,
      name: "",
      remark: ""
    }))
  }

  const [relayState, setRelayState] = useState(generateFirstStage());

  const handleInputChange = (index, event) => {

    const values = [...relayState];
    const updatedValue = event.target.name;
    values[index][updatedValue] = event.target.value;
    setRelayState(values);
  };


  const onSave = async () => {

    const status = await props.relayStore.addRelay(relayState)

    if (status === 200) {
      Swal.fire("Success", "add sensors success", "success").then(function () {
        // Redirect the user
        window.location.href = "/listDevice";
      });
    } else {
      Swal.fire("Waring", "failed to add sensor", "failed")
    }
  }


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
            การเพิ่มอุปกรณ์หน้าที่ 2
          </MDTypography>

        </MDBox>
        {Array.from(Array(location.state.relays), (relay, index) => {
          return <>

            <MDBox pt={4} pb={3} px={3}>
              <MDTypography variant="h6" fontWeight="" color="text">
                Relay {index + 1}
              </MDTypography>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Name"
                  variant="standard"
                  fullWidth
                  name="name"
                  value={relayState.name}
                  onChange={(value) => handleInputChange(index, value)}
                />
                <span style={{ color: "red" }}>{errors.name}</span>
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Remark"
                  variant="standard"
                  fullWidth
                  name="remark"
                  value={relayState.remark}
                  onChange={(value) => handleInputChange(index, value)}
                />
                <span style={{ color: "red" }}>{errors.remark}</span>
              </MDBox>

            </MDBox>

          </>
        })}

        <MDBox mt={4} mb={1}>
          <MDButton
            type="submit"
            variant="gradient"
            color="info"
            fullWidth
            onClick={() => onSave()}
          >
            บันทึก
          </MDButton>
        </MDBox>
      </Card>
    </DashboardLayout>

  );
}
export default inject("relayStore")(observer(Cover));
