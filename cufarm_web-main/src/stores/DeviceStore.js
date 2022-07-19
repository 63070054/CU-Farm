import axios from "axios";
import { toJS, runInAction } from "mobx";
import BaseStore from "./BaseStore";
import config from '../config/config'
import Swal from "sweetalert2";

export class DeviceStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      isLoading: false,
      user_device: [],
      sensors: [],
      device: {
        device_id: "",
        topic: "",
        proj: "",
        name: "",
        name2: "",
        abstract: "",
        lat: "",
        lon: "",
        relays: "",
        hasCamera: "",
        sleepTime1: "",
        sleepHours1: "",
        sleepTime2: "",
        sleepHours2: "",
        sensor: [],
        relays: [],
      },
      deviceID: "",
      user: "",
      formFields: [
        { name: "" },
      ],
      listDevice: []
    });
  }
  getAll() {
    return this.toJS();
  }

  setDeviceID(device_id) {
    this.deviceID = device_id;

  }

  async getAllUserDevice() {
    try {

      this.setLoading(true);
      const response = await axios.get(`${config.backendUrl}/user_device/${data.user}`);
      const { data } = response;

      if (response.status === 200) {
        runInAction(() => {
          this.user_device = data;
        });
      }
    } catch (err) {

    } finally {
      this.setLoading(false);
    }
  }

  async getGraphDetailed(deviceId) {
    try {
      console.log("backend url : ", config.backendUrl)
      const response = await axios.get(`${config.backendUrl}/sensorGraph/${deviceId}`);
      
      const { data } = response;


      if (response.status === 200) {
        runInAction(() => {
          this.sensors = data;
        });

      }
      return response;
    } catch (err) {

    }
  }

  async removeUserDevice(deviceID) {
    try {

      this.setLoading(true);
      const response = await axios.delete(`${config.backendUrl}/delete/${deviceID}`);

      if (response.status === 200) {
        Swal.fire("Success", "delete device success", "success");
      } else {
        Swal.fire("Error", "error delete device");
      }
      return response.status;
    } catch (err) {

    } finally {
      this.setLoading(false);
    }
  }

  async removeDevice(deviceID) {
    try {

      this.setLoading(true);
      const response = await axios.delete(`${config.backendUrl}/deleteDevice/${deviceID}`);

      if (response.status === 200) {
        return response.status
        Swal.fire("Success", "delete device success", "success");
      } else {
        Swal.fire("Error", "error delete device");
      }
      return response.status;
    } catch (err) {

    } finally {
      this.setLoading(false);
    }
  }

  async getUserDeviceByID(user) {
    try {

      this.setLoading(true);
      const response = await axios.post(`${config.backendUrl}/device/${this.deviceID}`, {
        user: user,
      });
      const { data } = response;

      if (response.status === 200) {
        runInAction(() => {
          this.device_id = data.device_id || ``;
          this.topic = data.topic || ``;
          this.device.proj = data.proj || ``;
          this.device.name = data.name || ``;
          this.device.name2 = data.name2 || ``;
          this.device.abstract = data.abstract || ``;
          this.device.lat = data.lat || ``;
          this.device.lon = data.lon || ``;
          this.device.relays = data.relays || ``;
          this.device.hasCamera = data.hasCamera || ``;
          this.device.sleepTime1 = data.sleepTime1 || ``;
          this.device.sleepHours1 = data.sleepHours1 || ``;
          this.device.sleepTime2 = data.sleepTime2 || ``;
          this.device.sleepHours2 = data.sleepHours2 || ``;
        });
      }
      return response;
    } catch (err) {

    } finally {
      this.setLoading(false);
    }
  }

  async getAllDevice() {
    try {

      const response = await axios.get(`${config.backendUrl}/device`);
      const { data } = response;
      if (response.status === 200) {
        runInAction(() => {
          this.listDevice = data;
        });
      }
      return response;
    } catch (err) {

    } finally {
      this.setLoading(false);
    }
  }

  handleChangeAddDevice(val, key) {
    // eslint-disable-next-line react/destructuring-assignment
    runInAction(() => {
      this.device[key] = val;
    });
  };

  async getAllDevice() {
    try {

      const response = await axios.get(`${config.backendUrl}/device`);
      const { data } = response;
      if (response.status === 200) {
        runInAction(() => {
          this.listDevice = data;
        });
      }
      return response;
    } catch (err) {

    } finally {
      this.setLoading(false);
    }
  }

  handleFormChange = (event, index, DeviceID) => {

    this.formFields[index].name = event;
  }

  setInvalid(key) {
    runInAction(() => {
      this.isInvalid[key] = true;
    });
  }

  async handleChange(val, key) {

    runInAction(() => {
      this.device[key] = val;
    });
  }

  submit() {
    // eslint-disable-next-line no-unused-expressions
    !this.data.email || !this.data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
      ? this.setInvalid("emailInvalid", true)
      : this.setInvalid("emailInvalid", false);
  }

  async setLoading(val) {
    runInAction(() => {
      this.isLoading = val;
    });
  }


  async submitDetail(device) {
    try {
      const response = await axios.post(`${config.backendUrl}/addDevice`, device);

      if (response.status === 200) {
        return response.status
      }
    } catch (err) {
      return err?.response?.data?.message;
    } finally {
    }
  }
}

export default new DeviceStore();
