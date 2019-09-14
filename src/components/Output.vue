<style lang="scss">
.empty-record {
  text-align: center;
  font-size: 50px;
}
.tracks-container {
  display: grid;
  grid-template-columns: repeat(2, 50%);

  .track-title{
    text-align: center;
    font-size: 30px;
    padding: 20px;
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
}
</style>

<template>
<div class="tracks-container" v-if="this.getScheduledData.length > 0">
  <div class="tracks" v-for="(outputTrack, index) in outputTracks" :key="index" >
    <div class="track-title">
      <strong>
        Track {{index + 1}}
      </strong>
    </div>
    <table class= "output-record-container" >
      <tr>
        <th>
          Event time
        </th>
        <th>
          Event title
        </th>
      </tr>
      <tr  :key="scheduledRecords.eventTitle" v-for="scheduledRecords in outputTrack">
        <td>
          {{scheduledRecords.eventTime}}
        </td>
        <td>
          {{scheduledRecords.eventTitle}}
        </td>
      </tr>
    </table>
  </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Output",
  computed: {
    ...mapGetters([
      "getScheduledData"
    ]),
    outputTracks() {
      let outputTracks = "";
      if (this.getScheduledData.length > 0) {
        outputTracks = this.getScheduledData
      }

      return outputTracks;
    }
  }
};
</script>