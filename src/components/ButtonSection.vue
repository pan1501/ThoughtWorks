<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.buttons-container {
  display: flex;
  justify-content: center;
  .upload-button-container,
  .schedule-button-container {
    padding: 1rem;
    label {
      color: black;
      border: 2px solid currentColor;
      max-width: 80%;
      font-size: 1.25rem;
      cursor: pointer;
      padding: 0.5rem 1rem;
    }
    .upload-button {
      display: none;
    }
  }
}
</style>

<template>
  <div class="buttons-container">
    <div class="upload-button-container">
      <label for="file">Choose a file</label>
      <input
        class="upload-button"
        name="file"
        id="file"
        type="file"
        accept="text/plain"
        v-on:change="openFile">
    </div>
    <div class="schedule-button-container">
      <label class="schedule-button" v-on:click="scheduleEvents">
        Schedule Event
      </label>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "ButtonSection",
  data() {
    return {
      buttonStatus: "No event to Schedule"
    };
  },
  computed: {
    ...mapGetters([
      "getDataReady"
    ])
  },
  methods: {
    ...mapMutations([
        "SET_RAW_DATA",
        "SCHEDULE_EVENTS"
    ]),
    openFile(event) {
      var input = event.target;
      var reader = new FileReader();
      reader.onload = () => {
        this.SET_RAW_DATA(reader.result);
      };

      if (input.files[0]) {
        reader.readAsText(input.files[0]);
      }
    },
    scheduleEvents() {
      if (this.getDataReady) {
        this.buttonStatus = "Event Scheduled";
        this.SCHEDULE_EVENTS();
      }
    }
  }
};
</script>
