export const Model = {
  convertTimeToMin(time) {
    if (!time || !+time || +time > 24) return null;
    let timeStamp = "AM";
    // Added 0 infront of the hours
    let hours = ("0" + Math.floor(time)).slice(-2);
    // Added 0 infront of the minutes
    let minutes = ("0" + Math.round((time - hours) * 60)).slice(-2);
    // Calculate the time stamp
    if (hours > 12 && hours < 24) {
      timeStamp = "PM";
    }
    if (hours > 12) {
      hours = ("0" + Math.floor(hours - 12)).slice(-2);
    }
    return `${hours}:${minutes} ${timeStamp}`;
  },
  // split event title and event duration from string
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
    this.recordUsed = [];
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
    // if current record is already used then skip to next one
    if (this.recordUsed.includes(currentRecordIndex)) currentRecordIndex++;
    // if all event is scheduled
    if (currentRecordIndex >= eventRecords.length) {
      this.scheduledEvents.push({
        eventTitle: "Networking Event",
        // Network event cant start earlier then 4
        eventTime: (eventStartTime < 16) ? this.convertTimeToMin("16") : this.convertTimeToMin(eventStartTime)
      });
      // Push the final scheduled event to track
      this.tracks.push(this.scheduledEvents);
      // break the recursion
      return;
    } else if (
      (eventStartTime >= 9 && eventStartTime < 12 && eventFinishTime > 12) ||
      (eventStartTime >= 13 && eventStartTime < 17 && eventFinishTime > 17)
    ) {
      // schedule if there is any small duration event that can fit in before 5PM
      for (let i = currentRecordIndex; i < eventRecords.length; i++) {
        eventFinishTime = eventStartTime + eventRecords[i].eventDuration / 60;
        if (eventFinishTime <= 17) {
          scheduledEvent.eventTitle = eventRecords[i].originalText;
          scheduledEvent.eventTime = this.convertTimeToMin(eventStartTime);
          this.scheduledEvents.push(scheduledEvent);
          eventStartTime = eventFinishTime;
          if (eventRecords[i + 1]) {
            eventFinishTime = eventStartTime + eventRecords[i + 1].eventDuration / 60;
          }
          this.recordUsed.push(i);
        }
      }
      this.scheduleEvents(
        eventRecords,
        currentRecordIndex,
        eventStartTime,
        eventFinishTime
      );
    } else if (
      eventStartTime >= 16 &&
      eventStartTime <= 17 &&
      eventFinishTime >= 17
    ) {
      // Networking cant start earlier then 4 and later then 5
      this.scheduledEvents.push({
        eventTitle: "Networking Event",
        eventTime: this.convertTimeToMin(eventStartTime)
      });
      this.tracks.push(this.scheduledEvents);
      // Start a new track
      this.scheduledEvents = [];
      // Reset the start time for the new track
      eventStartTime = 9;
      eventFinishTime = eventStartTime + +eventRecords[currentRecordIndex].eventDuration / 60;

      this.scheduleEvents(
        eventRecords,
        currentRecordIndex,
        eventStartTime,
        eventFinishTime
      );
      // schedule events that are no earlier then 9AM and no later then 12AM (morning)
      // And events that are no earlier then 1PM and no later then 5PM (afternoon)
    } else if (
      (eventStartTime >= 9 && eventStartTime < 12 && eventFinishTime <= 12) ||
      (eventStartTime >= 13 && eventStartTime < 17 && eventFinishTime <= 17)
    ) {
      scheduledEvent.eventTitle = eventRecords[currentRecordIndex].originalText;
      scheduledEvent.eventTime = this.convertTimeToMin(eventStartTime);
      this.scheduledEvents.push(scheduledEvent);

      // Next Record
      currentRecordIndex++;
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
    } else {
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
    }
  }
};
