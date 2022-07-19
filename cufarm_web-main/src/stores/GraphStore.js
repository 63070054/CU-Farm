import axios from "axios";
import { toJS, runInAction } from "mobx";
import BaseStore from "./BaseStore";
import moment from 'moment';
import config from '../config/config'
export class RelayStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      series: [
        {
          data: [
            {
              x: '',
              y: [
                Date
              ]
            },
          ]
        }
      ],
      options: {
        chart: {
          height: 350,
          type: 'rangeBar'
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        xaxis: {
          type: 'datetime'
        }
      },
    });
  }
  getAll() {
    return this.toJS();
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


}

export default new RelayStore();