import userStore from "./UserStore";
import authStore from "./AuthStore";
import deviceStore from "./DeviceStore";
import relayStore from "./RelayStore";
import modelSoilStore from "./ModelSoilStore";
import mqttStore from "./MQTTStore";
import addDeviceStore from "./AddDeviceStore"
import sensorStore from "./SensorStore"



const allStore = {
  userStore,
  authStore,
  deviceStore,
  relayStore,
  modelSoilStore,
  mqttStore,
  addDeviceStore,
  sensorStore
}

export default allStore;
