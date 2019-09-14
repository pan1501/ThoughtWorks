<style lang="scss">
.empty-record {
  text-align: center;
  font-size: 50px;
}
table{
  margin: auto;
  td {
    text-align: center;
  }
}
</style>

<template>
  <table class= "input-record-container" v-if="this.getPreprocessData.length > 0">
    <tr>
      <th>
        Event title
      </th>
      <th>
        Event duration
      </th>
    </tr>
    <tr  :key="inputRecord.eventTitle" v-for=" inputRecord in inputRecords">
      <td>
        {{inputRecord.eventTitle}}
      </td>
      <td>
        {{inputRecord.eventDuration}}
      </td>
    </tr>
  </table>
  <div class="empty-record" v-else>
    No data
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Input",
  computed: {
    ...mapGetters([
      "getPreprocessData"
    ]),
    inputRecords() {
      let inputRecords = "No data";
      if (this.getPreprocessData.length > 0) {
        inputRecords = this.getPreprocessData
      }
      return inputRecords;
    }
  }
};
</script>