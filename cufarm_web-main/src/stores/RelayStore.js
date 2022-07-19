import axios from "axios";
import { toJS, runInAction } from "mobx";
import BaseStore from "./BaseStore";
import moment from 'moment';
import config from '../config/config'
export class RelayStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      relay_auto: [],
      data: {
        device_id: "",
        relay_id: "",
        from_time: "",
        to_time: "",
        criteria: "",
      },
      relayData: {
        Id: "",
        device_id: "",
        relay_id: "",
        name: "",
        abstract: "",
        mode: "",
        status: "",
        relays: "",
        remark: "",
      },
    });
  }
  getAll() {
    return this.toJS();
  }

  async handleChange(val, index, key) {

    runInAction(() => {
      this.relay_auto[index][key] = val;
    });
  }

  async getAllRelayAuto(device_id) {
    try {
      // 

      const response = await axios.get(`${config.backendUrl}/relay_auto/${device_id}`);
      const { data } = response;
      if (response.status === 200) {
        runInAction(() => {
          this.relay_auto = data;
        });
      }

    } catch (err) {

    }
  }

  async addRelay(relayData) {

    try {
      const body = relayData.map(relay => ({
        device_id: relay.device_id,
        name: relay.name,
        remark: relay.remark
      }))
      const response = await axios.post(`${config.backendUrl}/addRelay`, { relays: body });

      if (response.status === 200)
        return response.status;
      else
        throw response


    } catch (err) {
      return err?.response?.data?.message;
    }
  }


  async setRelayAuto(relayAutoData) {

    try {
      const body = relayAutoData.relayData.relayAuto.map(relayAuto => ({
        device_id: relayAuto.device_id,
        relay_id: relayAuto.relay_id,
        from_time: moment(relayAuto.timeStart).format("YYYY-MM-DD HH:mm:ss"),
        to_time: moment(relayAuto.timeStop).format("YYYY-MM-DD HH:mm:ss"),
        criteria: `${relayAuto.criteriaTopic} ${relayAuto.criteriaCondition} ${relayAuto.criteriaValue}`
      }))
      const response = await axios.post(`${config.backendUrl}/relay_auto/${relayAutoData.relayData.relayAuto[0].device_id}`, { relayAutos: body });

      if (response.status === 200)
        return response;
      else
        throw response


    } catch (err) {
      return err?.response?.data?.message;
    }
  }
  /**
   * 
   * @param {*} data {relays: [{device_id, relay_id, mode, status}]}
   * @returns 
   */
  async onSave(device) {
    try {
      const response = await axios.post(`${config.backendUrl}/relay`, device);

      if (response === 200) {
        Swal.fire("Success", "add device success", "success");
        navigate("/listDevice")

      } else {

        Swal.fire({ icon: 'warning', text: "add device failed" });

      }
    } catch (err) {
      return err?.response?.data?.message;
    } finally {
    }
  }

  async setRelay(data) {

    try {
      const listResponse = []

      listResponse.push(data.relayData.relays.map(relay => {

        return axios.put(`${config.backendUrl}/relay/${relay.device_id}`, relay)
      }))


      // for (var i = 1; i < data.relayData.formFields.manualSwitches.length; i += 1) {
      //   listResponse.push(axios.put(`${config.backendUrl}relay/${data.relayData.relayAuto[0].device_id}`, {
      //     device_id: data.relayData.relayAuto[0].device_id,
      //     relay_id: data.relayData.relayAuto[0].relay_id,
      //     name: "",
      //     abstract: "",
      //     mode: data.relayData.formFields.relaySelects[i],
      //     status: data.relayData.formFields.manualSwitches[i],
      //     remark: "",
      //   }));
      // }

      const response = await Promise.all(listResponse)
      if (response[0].status === 200) {
        return response[0];
      }

      return response[0];

    } catch (err) {
      return err?.response?.data?.message;
    } finally {

    }
  }
}

export default new RelayStore();