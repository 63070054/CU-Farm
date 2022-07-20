import axios from "axios";
import { toJS, runInAction } from "mobx";
import BaseStore from "./BaseStore";
import config from '../config/config'

export class UserStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      isLoading: false,
      allUser: [],
      user_device: [],
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
      },
      data: {
        user: "",
        birth: "",
        name: "",
        address: "",
        email: "",
        tel: "",
        ID: "",
        password: "",
      },
    });
  }


  getAll() {
    return this.toJS();
  }

  async getUser(id) {
    try {
      this.setLoading(true);
      const response = await axios.get(`${config.backendUrl}/users/${id}`);
      const { data } = response;
      if (response.status === 200) {
        runInAction(() => {
          this.data.id = data.id || ``;
          this.data.user = data.user || ``;
          this.data.birth = data.birth || ``;
          this.data.name = data.name || ``;
          this.data.address = data.address || ``;
          this.data.password = data.password || ``;
          this.data.email = data.email || ``;
          this.data.ID = data.ID || ``;
          this.data.tel = data.tel || ``;
        });
      }
    } catch (err) {

    } finally {
      this.setLoading(false);
    }
  }

  async getAllUser() {
    try {
      this.setLoading(true);
      const response = await axios.get(`${config.backendUrl}/user`);
      const { data } = response;

      if (response.status === 200) {
        runInAction(() => {
          this.allUser = data;
        });
      }
    } catch (err) {

    } finally {
      this.setLoading(false);
    }
  }

  setIsExpand(index) {

    this.user_device.device[index].isExpand = !this.user_device.device[index].isExpand;

  }

  async getAllUserDevice(user) {

    try {
      const response = await axios.get(`${config.backendUrl}/getUser/${user}`);
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

  async getUserDeviceByID(deviceID) {
    try {
      this.setLoading(true);
      const response = await axios.get(`${config.backendUrl}/device/${deviceID}`);
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
    } catch (err) {

    } finally {
      this.setLoading(false);
    }
  }


  // eslint-disable-next-line consistent-return
  async createUser() {
    try {
      this.setLoading(true);

      const response = await axios.post(`${config.backendUrl}/register`, toJS(this.data));

      if (response.status === 200) {
        this.data = {
          user: "",
          birth: "",
          name: "",
          address: "",
          email: "",
          tel: "",
          ID: "",
          password: "",
        }
        return response;
      }
    } catch (err) {
      return err.response.data.msg;
    } finally {
      this.setLoading(false);
    }
  }

  setInvalid(key) {
    runInAction(() => {
      this.isInvalid[key] = true;
    });
  }

  async handleChange(val, key) {

    runInAction(() => {
      this.data[key] = val;
    });
  }

  async handleChangeDevice(val, key) {

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
}

export default new UserStore();
