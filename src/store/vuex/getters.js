export const getters = {
  getDataStatus: state => state.data_status,
  getDataReady: state => state.data_ready,
  getRawData: state => state.rawData,
  getPreprocessData: state => state.preprocessData,
  getScheduledData: state => state.scheduledData
};

export default getters;
