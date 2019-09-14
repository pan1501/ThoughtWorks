import { Model } from "../Model.js";

export const mutations = {
  SET_RAW_DATA(state, newRawData) {
    state.rawData = newRawData;
    state.preprocessData = Model.getPreprocessData(state.rawData);
    state.data_status = "complete";
    state.data_ready = true;
  },
  SCHEDULE_EVENTS(state) {
    state.scheduledData = Model.getScheduledEvents(state.preprocessData);
  }
};

export default mutations;
