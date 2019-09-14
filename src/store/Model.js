export const Model = {
  convertTimeToMin(time) {
    if (!time) return null;
    let timeStamp = "AM";
    // Added 0 infront of the hours
    let hours = ("0" + Math.floor(time)).slice(-2);
    // Added 0 infront of the minutes
    let minutes = ("0" + Math.round((time - hours) * 60)).slice(-2);
    // Calculate the time stamp
    if (hours > 12) {
      timeStamp = "PM";
      hours = ("0" + Math.floor(hours - 12)).slice(-2);
    }
    return `${hours}:${minutes} ${timeStamp}`;
  },

  getPreprocessData(rawData) {
    if (!rawData) return [];
    let splitedData = [];
    let preprocessData = [];

    splitedData = rawData.split("\n");
    splitedData.forEach(dataRecord => {
      let preprocessDataRecord = {};
      preprocessDataRecord.originalText = dataRecord;
      if (dataRecord.includes("lightning")) {
        preprocessDataRecord.eventTitle = dataRecord.split("lightning")[0];
        preprocessDataRecord.eventDuration = "5";
      } else {
        preprocessDataRecord.eventTitle = dataRecord.split(/(\d+)/)[0];
        preprocessDataRecord.eventDuration = dataRecord.split(/(\d+)/)[1];
      }
      preprocessData.push(preprocessDataRecord);
    });

    // Sort by event duration
    preprocessData.sort((a, b) => {
      return +b.eventDuration - +a.eventDuration;
    });

    return preprocessData;
  },

  getScheduledEvents(preprocessData) {
    if (preprocessData.length === 0) return [[]];
    this.tracks = [];
    this.scheduledEvents = [];
    let eventStartTime = 9;
    let currentRecordIndex = preprocessData.indexOf(preprocessData[0]);
    // Get finish time for the first record to start recursion
    let eventFinishTime = eventStartTime + +preprocessData[0].eventDuration / 60;

    this.scheduleEvents(
      preprocessData,
      currentRecordIndex,
      eventStartTime,
      eventFinishTime
    );

    return this.tracks;
  },

  scheduleEvents(eventRecords, currentRecordIndex, eventStartTime, eventFinishTime) {
    let scheduledEvent = {};
    if (currentRecordIndex === eventRecords.length) {
      this.scheduledEvents.push({
        eventTitle: "Networking Event",
        eventTime: this.convertTimeToMin(eventStartTime)
      });

      this.tracks.push(this.scheduledEvents);
      return;
      // schedule events that are no earlier then 9AM and no later then 12AM (morning)
      // And events that are no earlier then 1PM and no later then 5PM (afternoon)
    } else if (
      (eventStartTime >= 9 && eventFinishTime <= 12) ||
      (eventStartTime >= 13 && eventFinishTime < 17)
    ) {
      scheduledEvent.eventTitle = eventRecords[currentRecordIndex].originalText;
      scheduledEvent.eventTime = this.convertTimeToMin(eventStartTime);
      this.scheduledEvents.push(scheduledEvent);

      // Next Record
      currentRecordIndex = currentRecordIndex + 1;
      // Update the start time for next event
      eventStartTime = eventFinishTime;
      // If next record exist
      if (eventRecords[currentRecordIndex]) {
        // Update finish time for the current event
        eventFinishTime = eventStartTime + eventRecords[currentRecordIndex].eventDuration / 60;
      }

      this.scheduleEvents(
        eventRecords,
        currentRecordIndex,
        eventStartTime,
        eventFinishTime
      );
      // Schedule lunch time
    } else if (eventFinishTime > 12 && eventFinishTime <= 13) {
      scheduledEvent.eventTitle = "Lunch";
      scheduledEvent.eventTime = "12:00PM";
      this.scheduledEvents.push(scheduledEvent);

      eventStartTime = 13;
      eventFinishTime = eventStartTime + eventRecords[currentRecordIndex].eventDuration / 60;

      this.scheduleEvents(
        eventRecords,
        currentRecordIndex,
        eventStartTime,
        eventFinishTime
      );
    } else {
      // schedule if there is any small duration event that can fit in before 5PM
      for (let i = currentRecordIndex; i < eventRecords.length; i++) {
        if (eventStartTime + eventRecords[i].eventDuration / 60 <= 17) {
          scheduledEvent.eventTitle = eventRecords[i].originalText;
          scheduledEvent.eventTime = this.convertTimeToMin(eventStartTime);
          this.scheduledEvents.push(scheduledEvent);

          eventFinishTime = eventStartTime + eventRecords[i].eventDuration / 60;
          eventStartTime = eventFinishTime;
        }
      }
      // if no other event can fit it add networking at the end
      if (
        eventStartTime >= 17 ||
        currentRecordIndex + 1 === eventRecords.length
      ) {
        this.scheduledEvents.push({
          eventTitle: "Networking Event",
          eventTime: this.convertTimeToMin(eventStartTime)
        });

        this.tracks.push(this.scheduledEvents);
        // start a new track
        this.scheduledEvents = [];
        eventStartTime = 9;
        eventFinishTime = eventStartTime + +eventRecords[currentRecordIndex].eventDuration / 60;

        this.scheduleEvents(
          eventRecords,
          currentRecordIndex,
          eventStartTime,
          eventFinishTime
        );
      }
    }
  }
};
