import BaseStore from './BaseStore';
import axios from 'axios';
//import config from '../config';
import { toJS, runInAction } from "mobx";
import auth from '../utilis/auth';
//const API_URL = `${config.api.url}/api/`;
import config from '../config/config'
export class AuthStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      user_device: [],
      citizenID: '',
      birthdate: '',
      errorMessage: '',
      Lodding: false,
      user: '',

    });
  }

  async handleChange(val, index, key) {

    runInAction(() => {
      this.user_device[index][key] = val;
    });
  }

  setCitizenID(id) {

    this.citizenID = id;
  }

  setBirthdate(birthdate) {
    this.birthdate = birthdate;
  }

  setIsExpand(index) {

    this.user_device.device[index].isExpand = !this.user_device.device[index].isExpand;

  }

  setError() {
    this.errorMessage = '';
  }

  async getAllUserDevice(user) {
    try {

      this.setLoading(true);
      const response = await axios.get(`${config.backendUrl}/user_device/${user}`);


      const { data } = response;
      const deviceData = data;
      deviceData.device = deviceData.device.map(val => {
        return {
          ...val, isExpand: false, formFields: [
            { name: "" },
          ]
        }
      });

      if (response.status === 200) {
        runInAction(() => {
          this.user_device = deviceData
        });
      }
    } catch (err) {

    } finally {
      this.setLoading(false);
    }
  }

  // async login() {
  //   this.errorMessage = '';
  //   try {
  //     this.Loading = true;
  //     const res = await axios.post(`${config.backendUrl}/login`, {
  //       citizenID: this.citizenID,
  //       birthdate: this.birthdate,
  //     });
  //     if (res.status === 200) {
  //       runInAction(() => {
  //         this.user_device = res.data;
  //       });
  //       auth.signIn(res.data.token, res.data.userData);
  //     }

  //     if (res) this.Loading = false;
  //     return res.status;
  //   } catch (error) {
  //     this.Loading = false;
  //     if (error?.response?.status === 500) {
  //       this.errorMessage = error?.response?.data?.message;
  //     } else {
  //       throw error;
  //     }
  //   } 
  // }



  async loginAdmin() {
    try {
      this.Loading = true;
      const response = await axios.post(`${config.backendUrl}/loginAdmin`, {
        citizenID: this.citizenID,
        birthdate: this.birthdate,
      });

      const { data, status } = response;

      const deviceData = data;
      deviceData.device = deviceData.device.map(val => {
        return {
          ...val, isExpand: false, relays: val.relays.map(relay => ({
            ...relay, timeStart: relay.timeStart, timeStop: relay.timeStop, criteriaTopic: "", criteriaCondition: "", criteriaValue: "", formFields: [{ timeStart: new Date(), timeStop: new Date(), criteriaTopic: "", criteriaCondition: "", criteriaValue: "" }]
          }))
        }
      });




      if (status === 200) {
        runInAction(() => {
          this.user_device = deviceData

          auth.signIn(deviceData.token, deviceData.user);
        });

        return response;
      }
      // if (status === 200) {
      //   runInAction(() => {
      //     this.user_device = data;
      //   });

      //}
    } catch (err) {
      return err?.response?.data?.message;
    } finally {
      this.Loading = false;
    }
  }

  async login() {
    try {
      this.Loading = true;
      const response = await axios.post(`${config.backendUrl}/login`, {
        citizenID: this.citizenID,
        birthdate: this.birthdate,
      });


      if (response.status === 200) {
        runInAction(() => {
          const { data, status } = response;

          const deviceData = data;
          deviceData.device = deviceData.device.map(val => {
            return {
              ...val, isExpand: false, relays: val.relays.map(relay => ({
                ...relay, timeStart: relay.timeStart, timeStop: relay.timeStop, criteriaTopic: "", criteriaCondition: "", criteriaValue: "", formFields: [{ timeStart: new Date(), timeStop: new Date(), criteriaTopic: "", criteriaCondition: "", criteriaValue: "" }]
              }))
            }
          });
          this.user_device = deviceData

          auth.signIn(deviceData.token, deviceData.user);
        });

        return response;
      }
      // if (status === 200) {
      //   runInAction(() => {
      //     this.user_device = data;
      //   });

      //}
    } catch (err) {
      return err;
    } finally {
      this.Loading = false;
    }
  }

}



export default new AuthStore();
