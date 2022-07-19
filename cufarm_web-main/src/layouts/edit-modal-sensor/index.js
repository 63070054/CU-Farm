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




  const { birth, name, address, email, tel, ID, password } = props.userStore.toJS().data;





  const [relayState, setRelayState] = useState({
    id: props.sensorIndex,
    name: props.sensor.name,
    remark: props.sensor.remark,
  })

  const handleChange = (value, key) => {
    setRelayState(relayState => ({
      ...relayState,
      [key]: value
    }));
  };

  const submit = async (relayState) => {

    props.callback(relayState)
    // 
    // try {
    //   const response = await axios.put(`${config.backendUrl}/relayModal/${props.relay.device_id}`,
    //     relayState
    //   );
    //   
    //   if (response.status === 200) {
    //     //await Swal.fire("Success", "Register success", "success");
    //     window.location.reload(true);
    //   }
    // } catch (err) {
    //   return err?.response?.data?.message;
    // } finally {
    // }
  }

  return (
    <DashboardLayout>
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
            ปุ่มแก้ไขชื่อ + คำอธิบาย ของ sensor
          </MDTypography>

        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          {/* {props.sensor.map((sen, index) => ( */}
          <>
            <MDTypography variant="h4" fontWeight="small" color="black" mt={1}>
              {relayState.name}
            </MDTypography>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="ชื่อ sensor"
                variant="standard"
                fullWidth
                value={relayState.name}
                onChange={(html) => handleChange(html.target.value, "name")}
              />
              <span style={{ color: "red" }}>{errors.tel}</span>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="คำอธิบาย sensor"
                variant="standard"
                fullWidth
                value={relayState.remark}
                onChange={(html) => handleChange(html.target.value, "remark")}
              />
              <span style={{ color: "red" }}>{errors.email}</span>
            </MDBox>
          </>
          {/* ))} */}


          <MDBox mt={4} mb={1}>
            <MDButton
              type="submit"
              variant="gradient"
              color="info"
              fullWidth
              onClick={() => submit(relayState)}
            >
              บันทึก
            </MDButton>
          </MDBox>
        </MDBox>

      </Card>
    </DashboardLayout>

  );
}
export default inject("userStore")(observer(Cover));
