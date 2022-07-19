import axios from "axios";
import { toJS, runInAction } from "mobx";
import BaseStore from "./BaseStore";
import config from '../config/config'
export class ModelSoilStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      model_soil: [],
      data: {
        device_id: "",
        date_model: "",
        humid: "",
      }
    })
  }
  getAll() {
    return this.toJS();
  }

  async setModelSoil() {
    try {
      this.setLoading(true);

      const response = await axios.post(`${config.backendUrl}/model_soil`, toJS(this.data));

      if (response.status === 200) {
        return response;
      }
    } catch (err) {
      return err?.response?.data?.message;
    } finally {
      this.setLoading(false);
    }
  }

  async getModelSoil() {
    try {
      const response = await axios.get(`${config.backendUrl}/model_soil`);
      const { data } = response;
      if (response.status === 200) {
        runInAction(() => {
          this.model_soil = data;
        });
      }
    } catch (err) {
      return err
    }
  }

}
export default new ModelSoilStore();