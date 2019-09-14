<style lang="scss">
.empty-record {
  text-align: center;
  font-size: 50px;
}
.output-record-container{
  margin: auto;
  td:nth-child(1) {
    text-align: center;
  }
  td:nth-child(2) {
    text-align: left;
  }
}
</style>

<template>
  <table class= "output-record-container" v-if="this.getScheduledData.length > 0">
    <tr>
      <th>
        Event time
      </th>
      <th>
        Event title
      </th>
    </tr>
    <tr  :key="outputRecord.eventTitle" v-for=" outputRecord in outputRecords">
      <td>
        {{outputRecord.eventTime}}
      </td>
      <td>
        {{outputRecord.eventTitle}}
      </td>
    </tr>
  </table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Output",
  computed: {
    ...mapGetters([
      "getScheduledData"
    ]),
    outputRecords() {
      let OutputRecords = "";
      if (this.getScheduledData.length > 0) {
        OutputRecords = this.getScheduledData
      }
      debugger;
      return OutputRecords;
    }
  }
};
</script>