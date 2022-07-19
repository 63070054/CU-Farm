import axios from "axios";
import { toJS, runInAction } from "mobx";
import BaseStore from "./BaseStore";
import moment from 'moment';
import config from '../config/config'
export class SensorStore extends BaseStore {
  constructor() {
    super();
    this.observable({
    });
  }
  getAll() {
    return this.toJS();
  }




  async addSensor(sensorData) {

    try {
      const body = sensorData.map(sensor => ({
        device_id: sensor.device_id,
        name: sensor.name,
        abstract: sensor.abstract,
        param: sensor.param,
        unit: sensor.unit,
        type: sensor.type
      }))
      const response = await axios.post(`${config.backendUrl}/addSensor`, { sensors: body });

      if (response.status === 200)
        return response.status;
      else
        throw response


    } catch (err) {
      return err?.response?.data?.message;
    }
  }



}

export default new SensorStore();