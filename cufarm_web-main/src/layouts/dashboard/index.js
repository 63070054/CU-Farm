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
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { observer, inject } from "mobx-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import auth from "../../utilis/auth"
import Map from "../map"
function Dashboard(props) {
  const position = [51.505, -0.09]
  useEffect(() => {
    const init = async () => {
      const isLogin = auth.isAuthenticated()
      const { user_device } = props.authStore.toJS();
      const { listDevice } = props.deviceStore.toJS();
      await props.deviceStore.getAllDevice()
      await props.authStore.loginAdmin()
      const model_soil = await props.modelSoilStore.getModelSoil()


      const result = await Promise.all(user_device.device.map(async (aDevice) => {
        return Promise.all(aDevice.relays.map(async (relay, id) => {
          const resultRelayAuto = await props.relayStore.getAllRelayAuto(relay.device_id)
          return resultRelayAuto
        }))
      }))

    };
    init();
  }, []);

  const navigate = useNavigate();


  //const { formFields } = props.authStore.toJS()
  const handleIsExpanded = (index) => {
    //ทำการเช็คด้วยว่าการส่งค่า mqtt สำเร็จมั้ย ถ้าสำเร็จ alert success ไม่สำเร็จ alert fail และ alert เตือนว่าไม่ได้เซฟ
    props.authStore.setIsExpand(index)
  };

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

  const handleCheck = (itemId) => {
    const newItems = [...items];

    newItems[itemId].isSelected = !newItems[itemId].isSelected;

    setCheck(newItems);
  };


  //const [childData, setChildData] = useState()
  const handleCallback = async (childData) => {

    const statusRelayAuto = await props.relayStore.setRelayAuto(childData);
    const statusRelay = await props.relayStore.setRelay(childData);

    if (statusRelayAuto.status || statusRelay[0].status === 200) {
      const statusMQTT = await props.mqttStore.mqttRequest(childData);

      if (statusMQTT === 200) {
        await Swal.fire("Success", "order mqtt success", "success");
        navigate("/dashboard")
      } else {
        await Swal.fire("Error", "error mqtt");
      }
    } else {
      await Swal.fire("Error", "error");
    }
  }


  const { relay_auto } = props.relayStore.toJS();
  const { user_device } = props.authStore.toJS();
  const { model_soil } = props.modelSoilStore.toJS();
  const { listDevice } = props.deviceStore.toJS();
  if (!user_device.device) {

    auth.signOutAndClear();
    navigate("/authentication/sign-in")
    return (<><div>test</div></>);
  };

  return (

    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={1} >
        <Map map={user_device.device} />
        <Grid container spacing={3}>
          {user_device.device && (user_device.device).map((customer, index) => (
            // {isLoggedIn ? <button>Logout</button> : <button>Login</button>}

            <Grid item xs={12} md={6} lg={3} >
              <MDBox m={3}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="weekend"
                  device={customer.device}
                  title={customer.device.name}
                  count={customer.device.device_id}
                  percentage={{
                    color: "success",
                    amount: "+55%",
                    label: "than lask week",
                  }}
                  setExpand={() => handleIsExpanded(index)}
                  setDelete={() => removeUserDevice(customer.device.device_id)}
                  isExpand={customer.isExpand}
                  sensors={customer.sensors}
                  relays={customer.relays}
                  relayAuto={relay_auto}
                  influxsensors={customer.influxsensors}
                  parentCallback={handleCallback}
                  model_soil={model_soil}
                  index={index}
                />
              </MDBox>
            </Grid>
          ))}
        </Grid>
      </MDBox>

    </DashboardLayout >
  );
}

export default inject("authStore", "deviceStore", "relayStore", "mqttStore", "modelSoilStore")(observer(Dashboard));
