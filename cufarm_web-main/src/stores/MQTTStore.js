import axios from "axios";
import { toJS, runInAction } from "mobx";
import BaseStore from "./BaseStore";
import moment from 'moment';
import config from '../config/config'
export class MQTTStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      mqttBinary: [],
    })
  }
  getAll() {
    return this.toJS();
  }

  async mqttRequest(childData) {

    try {
      const response = await axios.post(`${config.backendUrl}/mqtt`, {
        device_id: childData.relayData.relays[0].device_id
      });

      if (response.status === 200) {
        return response.status;
      }


    } catch (err) {
      return err?.response?.data?.message;
    } finally {

    }
  }
}

export default new MQTTStore();