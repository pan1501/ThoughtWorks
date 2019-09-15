import { Model } from "@/store/Model.js";

describe("Unit test for convertTimeToMin function", () => {
  it("With morning time passed in should correctly convert&return to hours, min, time stamp ", () => {
    expect(Model.convertTimeToMin("9.50")).toBe("09:30 AM");
  });
  it("With afternoon time passed in should correctly convert&return to hours, min, time stamp", () => {
    expect(Model.convertTimeToMin("14.20")).toBe("02:12 PM");
  });

  it("With afternoon time passed in should correctly convert&return to hours, min, time stamp", () => {
    expect(Model.convertTimeToMin("24")).toBe("12:00 AM");
  });

  it("With anything greater then 24 passed in should return null", () => {
    expect(Model.convertTimeToMin("25")).toBe(null);
  });
  it("With randrom passed in should return null", () => {
    expect(Model.convertTimeToMin("fwfe")).toBe(null);
  });
  it("With empty string passed in should return null", () => {
    expect(Model.convertTimeToMin("")).toBe(null);
  });
  it("With undefined passed in should return null", () => {
    expect(Model.convertTimeToMin(undefined)).toBe(null);
  });
  it("With null passed in should return null", () => {
    expect(Model.convertTimeToMin(null)).toBe(null);
  });
});

describe("Unit test for getPreprocessData function", () => {
  it("with empty data should return empty array", () => {
    expect(Model.getPreprocessData("")).toEqual([]);
  });
  it("with null should return empty array", () => {
    expect(Model.getPreprocessData(null)).toEqual([]);
  });
  it("with undefined should return empty array", () => {
    expect(Model.getPreprocessData(undefined)).toEqual([]);
  });

  it("With test in task sheet should seperate the event name and event duration", () => {
    let rawData = `Writing Fast Tests Against Enterprise Rails 60min
Overdoing it in Python 45min
Lua for the Masses 30min
Ruby Errors from Mismatched Gem Versions 45min
Common Ruby Errors 45min
Rails for Python Developers lightning
Communicating Over Distance 60min
Accounting­Driven Development 45min
Woah 30min
Sit Down and Write 30min
Pair Programming vs Noise 45min
Rails Magic 60min
Ruby on Rails: Why We Should Move On 60min
Clojure Ate Scala (on my project) 45min
Programming in the Boondocks of Seattle 30min
Ruby vs. Clojure for Back­End Development 30min
Ruby on Rails Legacy App Maintenance 60min
A World Without HackerNews 30min
User Interface CSS in Rails Apps 30min`;
    let expectedResult = [
      {
        eventDuration: "60",
        eventTitle: "Writing Fast Tests Against Enterprise Rails ",
        originalText: "Writing Fast Tests Against Enterprise Rails 60min"
      },
      {
        eventDuration: "60",
        eventTitle: "Ruby on Rails Legacy App Maintenance ",
        originalText: "Ruby on Rails Legacy App Maintenance 60min"
      },
      {
        eventDuration: "60",
        eventTitle: "Ruby on Rails: Why We Should Move On ",
        originalText: "Ruby on Rails: Why We Should Move On 60min"
      },
      {
        eventDuration: "60",
        eventTitle: "Communicating Over Distance ",
        originalText: "Communicating Over Distance 60min"
      },
      {
        eventDuration: "60",
        eventTitle: "Rails Magic ",
        originalText: "Rails Magic 60min"
      },
      {
        eventDuration: "45",
        eventTitle: "Ruby Errors from Mismatched Gem Versions ",
        originalText: "Ruby Errors from Mismatched Gem Versions 45min"
      },
      {
        eventDuration: "45",
        eventTitle: "Pair Programming vs Noise ",
        originalText: "Pair Programming vs Noise 45min"
      },
      {
        eventDuration: "45",
        eventTitle: "Accounting­Driven Development ",
        originalText: "Accounting­Driven Development 45min"
      },
      {
        eventDuration: "45",
        eventTitle: "Common Ruby Errors ",
        originalText: "Common Ruby Errors 45min"
      },
      {
        eventDuration: "45",
        eventTitle: "Clojure Ate Scala (on my project) ",
        originalText: "Clojure Ate Scala (on my project) 45min"
      },
      {
        eventDuration: "45",
        eventTitle: "Overdoing it in Python ",
        originalText: "Overdoing it in Python 45min"
      },
      {
        eventDuration: "30",
        eventTitle: "Lua for the Masses ",
        originalText: "Lua for the Masses 30min"
      },
      { eventDuration: "30", eventTitle: "Woah ", originalText: "Woah 30min" },
      {
        eventDuration: "30",
        eventTitle: "A World Without HackerNews ",
        originalText: "A World Without HackerNews 30min"
      },
      {
        eventDuration: "30",
        eventTitle: "Programming in the Boondocks of Seattle ",
        originalText: "Programming in the Boondocks of Seattle 30min"
      },
      {
        eventDuration: "30",
        eventTitle: "Ruby vs. Clojure for Back­End Development ",
        originalText: "Ruby vs. Clojure for Back­End Development 30min"
      },
      {
        eventDuration: "30",
        eventTitle: "User Interface CSS in Rails Apps ",
        originalText: "User Interface CSS in Rails Apps 30min"
      },
      {
        eventDuration: "30",
        eventTitle: "Sit Down and Write ",
        originalText: "Sit Down and Write 30min"
      },
      {
        eventDuration: "5",
        eventTitle: "Rails for Python Developers ",
        originalText: "Rails for Python Developers lightning"
      }
    ];

    expect(Model.getPreprocessData(rawData)).toEqual(expectedResult);
  });
});

describe("Unit test for getScheduledEvents function", () => {
  it("With test1 data (provided in task sheet) it should return scheduled event", () => {
    let preprocessData = [
      {
        eventDuration: "60",
        eventTitle: "Writing Fast Tests Against Enterprise Rails ",
        originalText: "Writing Fast Tests Against Enterprise Rails 60min"
      },
      {
        eventDuration: "60",
        eventTitle: "Ruby on Rails Legacy App Maintenance ",
        originalText: "Ruby on Rails Legacy App Maintenance 60min"
      },
      {
        eventDuration: "60",
        eventTitle: "Ruby on Rails: Why We Should Move On ",
        originalText: "Ruby on Rails: Why We Should Move On 60min"
      },
      {
        eventDuration: "60",
        eventTitle: "Communicating Over Distance ",
        originalText: "Communicating Over Distance 60min"
      },
      {
        eventDuration: "60",
        eventTitle: "Rails Magic ",
        originalText: "Rails Magic 60min"
      },
      {
        eventDuration: "45",
        eventTitle: "Ruby Errors from Mismatched Gem Versions ",
        originalText: "Ruby Errors from Mismatched Gem Versions 45min"
      },
      {
        eventDuration: "45",
        eventTitle: "Pair Programming vs Noise ",
        originalText: "Pair Programming vs Noise 45min"
      },
      {
        eventDuration: "45",
        eventTitle: "Accounting­Driven Development ",
        originalText: "Accounting­Driven Development 45min"
      },
      {
        eventDuration: "45",
        eventTitle: "Common Ruby Errors ",
        originalText: "Common Ruby Errors 45min"
      },
      {
        eventDuration: "45",
        eventTitle: "Clojure Ate Scala (on my project) ",
        originalText: "Clojure Ate Scala (on my project) 45min"
      },
      {
        eventDuration: "45",
        eventTitle: "Overdoing it in Python ",
        originalText: "Overdoing it in Python 45min"
      },
      {
        eventDuration: "30",
        eventTitle: "Lua for the Masses ",
        originalText: "Lua for the Masses 30min"
      },
      { eventDuration: "30", eventTitle: "Woah ", originalText: "Woah 30min" },
      {
        eventDuration: "30",
        eventTitle: "A World Without HackerNews ",
        originalText: "A World Without HackerNews 30min"
      },
      {
        eventDuration: "30",
        eventTitle: "Programming in the Boondocks of Seattle ",
        originalText: "Programming in the Boondocks of Seattle 30min"
      },
      {
        eventDuration: "30",
        eventTitle: "Ruby vs. Clojure for Back­End Development ",
        originalText: "Ruby vs. Clojure for Back­End Development 30min"
      },
      {
        eventDuration: "30",
        eventTitle: "User Interface CSS in Rails Apps ",
        originalText: "User Interface CSS in Rails Apps 30min"
      },
      {
        eventDuration: "30",
        eventTitle: "Sit Down and Write ",
        originalText: "Sit Down and Write 30min"
      },
      {
        eventDuration: "5",
        eventTitle: "Rails for Python Developers ",
        originalText: "Rails for Python Developers lightning"
      }
    ];
    let expectedResult = [
      [
        {
          eventTime: "09:00 AM",
          eventTitle: "Writing Fast Tests Against Enterprise Rails 60min"
        },
        {
          eventTime: "10:00 AM",
          eventTitle: "Ruby on Rails Legacy App Maintenance 60min"
        },
        {
          eventTime: "11:00 AM",
          eventTitle: "Ruby on Rails: Why We Should Move On 60min"
        },
        { eventTime: "12:00PM", eventTitle: "Lunch" },
        {
          eventTime: "01:00 PM",
          eventTitle: "Communicating Over Distance 60min"
        },
        { eventTime: "02:00 PM", eventTitle: "Rails Magic 60min" },
        {
          eventTime: "03:00 PM",
          eventTitle: "Ruby Errors from Mismatched Gem Versions 45min"
        },
        {
          eventTime: "03:45 PM",
          eventTitle: "Pair Programming vs Noise 45min"
        },
        { eventTime: "04:30 PM", eventTitle: "Lua for the Masses 30min" },
        { eventTime: "05:00 PM", eventTitle: "Networking Event" }
      ],
      [
        {
          eventTime: "09:00 AM",
          eventTitle: "Accounting­Driven Development 45min"
        },
        { eventTime: "09:45 AM", eventTitle: "Common Ruby Errors 45min" },
        {
          eventTime: "10:30 AM",
          eventTitle: "Clojure Ate Scala (on my project) 45min"
        },
        { eventTime: "11:15 AM", eventTitle: "Overdoing it in Python 45min" },
        { eventTime: "12:00PM", eventTitle: "Lunch" },
        { eventTime: "01:00 PM", eventTitle: "Woah 30min" },
        {
          eventTime: "01:30 PM",
          eventTitle: "A World Without HackerNews 30min"
        },
        {
          eventTime: "02:00 PM",
          eventTitle: "Programming in the Boondocks of Seattle 30min"
        },
        {
          eventTime: "02:30 PM",
          eventTitle: "Ruby vs. Clojure for Back­End Development 30min"
        },
        {
          eventTime: "03:00 PM",
          eventTitle: "User Interface CSS in Rails Apps 30min"
        },
        { eventTime: "03:30 PM", eventTitle: "Sit Down and Write 30min" },
        {
          eventTime: "04:00 PM",
          eventTitle: "Rails for Python Developers lightning"
        },
        { eventTime: "04:05 PM", eventTitle: "Networking Event" }
      ]
    ];
    expect(Model.getScheduledEvents(preprocessData)).toEqual(expectedResult);
  });
  it("With different event data (event finish earlier then 4) it should return scheduled event", () => {
    let preprocessData = [
      {
        eventDuration: "45",
        eventTitle: "Ruby Errors from Mismatched Gem Versions ",
        originalText: "Ruby Errors from Mismatched Gem Versions 45min"
      },
      {
        eventDuration: "45",
        eventTitle: "Pair Programming vs Noise ",
        originalText: "Pair Programming vs Noise 45min"
      },
      {
        eventDuration: "45",
        eventTitle: "Accounting­Driven Development ",
        originalText: "Accounting­Driven Development 45min"
      },
      {
        eventDuration: "45",
        eventTitle: "Common Ruby Errors ",
        originalText: "Common Ruby Errors 45min"
      },
      {
        eventDuration: "45",
        eventTitle: "Clojure Ate Scala (on my project) ",
        originalText: "Clojure Ate Scala (on my project) 45min"
      },
      {
        eventDuration: "45",
        eventTitle: "Overdoing it in Python ",
        originalText: "Overdoing it in Python 45min"
      },
      {
        eventDuration: "30",
        eventTitle: "Lua for the Masses ",
        originalText: "Lua for the Masses 30min"
      },
      { eventDuration: "30", eventTitle: "Woah ", originalText: "Woah 30min" },
      {
        eventDuration: "30",
        eventTitle: "A World Without HackerNews ",
        originalText: "A World Without HackerNews 30min"
      },
      {
        eventDuration: "30",
        eventTitle: "Programming in the Boondocks of Seattle ",
        originalText: "Programming in the Boondocks of Seattle 30min"
      },
      {
        eventDuration: "30",
        eventTitle: "Ruby vs. Clojure for Back­End Development ",
        originalText: "Ruby vs. Clojure for Back­End Development 30min"
      },
      {
        eventDuration: "30",
        eventTitle: "User Interface CSS in Rails Apps ",
        originalText: "User Interface CSS in Rails Apps 30min"
      },
      {
        eventDuration: "30",
        eventTitle: "Sit Down and Write ",
        originalText: "Sit Down and Write 30min"
      },
      {
        eventDuration: "20",
        eventTitle: "Writing Fast Tests Against Enterprise Rails ",
        originalText: "Writing Fast Tests Against Enterprise Rails 20min"
      },
      {
        eventDuration: "20",
        eventTitle: "Ruby on Rails Legacy App Maintenance ",
        originalText: "Ruby on Rails Legacy App Maintenance 20min"
      },
      {
        eventDuration: "20",
        eventTitle: "Ruby on Rails: Why We Should Move On ",
        originalText: "Ruby on Rails: Why We Should Move On 20min"
      },
      {
        eventDuration: "20",
        eventTitle: "Communicating Over Distance ",
        originalText: "Communicating Over Distance 20min"
      },
      {
        eventDuration: "20",
        eventTitle: "Rails Magic ",
        originalText: "Rails Magic 20min"
      },
      {
        eventDuration: "5",
        eventTitle: "Rails for Python Developers ",
        originalText: "Rails for Python Developers lightning"
      }
    ];
    let expectedResult = [
      [
        {
          eventTime: "09:00 AM",
          eventTitle: "Ruby Errors from Mismatched Gem Versions 45min"
        },
        {
          eventTime: "09:45 AM",
          eventTitle: "Pair Programming vs Noise 45min"
        },
        {
          eventTime: "10:30 AM",
          eventTitle: "Accounting­Driven Development 45min"
        },
        { eventTime: "11:15 AM", eventTitle: "Common Ruby Errors 45min" },
        { eventTime: "12:00PM", eventTitle: "Lunch" },
        {
          eventTime: "01:00 PM",
          eventTitle: "Clojure Ate Scala (on my project) 45min"
        },
        { eventTime: "01:45 PM", eventTitle: "Overdoing it in Python 45min" },
        { eventTime: "02:30 PM", eventTitle: "Lua for the Masses 30min" },
        { eventTime: "03:00 PM", eventTitle: "Woah 30min" },
        {
          eventTime: "03:30 PM",
          eventTitle: "A World Without HackerNews 30min"
        },
        {
          eventTime: "04:00 PM",
          eventTitle: "Programming in the Boondocks of Seattle 30min"
        },
        { eventTime: "04:30 PM", eventTitle: "Networking Event" }
      ],
      [
        {
          eventTime: "09:00 AM",
          eventTitle: "Ruby vs. Clojure for Back­End Development 30min"
        },
        {
          eventTime: "09:30 AM",
          eventTitle: "User Interface CSS in Rails Apps 30min"
        },
        { eventTime: "10:00 AM", eventTitle: "Sit Down and Write 30min" },
        {
          eventTime: "10:30 AM",
          eventTitle: "Writing Fast Tests Against Enterprise Rails 20min"
        },
        {
          eventTime: "10:50 AM",
          eventTitle: "Ruby on Rails Legacy App Maintenance 20min"
        },
        {
          eventTime: "11:10 AM",
          eventTitle: "Ruby on Rails: Why We Should Move On 20min"
        },
        {
          eventTime: "11:30 AM",
          eventTitle: "Communicating Over Distance 20min"
        },
        {
          eventTime: "12:10 AM",
          eventTitle: "Rails for Python Developers lightning"
        },
        {
          eventTime: "12:10 AM",
          eventTitle: "Rails for Python Developers lightning"
        },
        { eventTime: "12:00PM", eventTitle: "Lunch" },
        { eventTime: "04:00 PM", eventTitle: "Networking Event" }
      ]
    ];
    expect(Model.getScheduledEvents(preprocessData)).toEqual(expectedResult);
  });

  it("With different event data (event finish earlier then 4) it should return scheduled event", () => {
    let preprocessData = [
      {
        eventDuration: "45",
        eventTitle: "Ruby Errors from Mismatched Gem Versions ",
        originalText: "Ruby Errors from Mismatched Gem Versions 45min"
      },
      {
        eventDuration: "45",
        eventTitle: "Pair Programming vs Noise ",
        originalText: "Pair Programming vs Noise 45min"
      },
      {
        eventDuration: "45",
        eventTitle: "Accounting­Driven Development ",
        originalText: "Accounting­Driven Development 45min"
      },
      {
        eventDuration: "45",
        eventTitle: "Common Ruby Errors ",
        originalText: "Common Ruby Errors 45min"
      },
      {
        eventDuration: "45",
        eventTitle: "Clojure Ate Scala (on my project) ",
        originalText: "Clojure Ate Scala (on my project) 45min"
      },
      {
        eventDuration: "45",
        eventTitle: "Overdoing it in Python ",
        originalText: "Overdoing it in Python 45min"
      },
      {
        eventDuration: "30",
        eventTitle: "Lua for the Masses ",
        originalText: "Lua for the Masses 30min"
      },
      { eventDuration: "30", eventTitle: "Woah ", originalText: "Woah 30min" },
      {
        eventDuration: "30",
        eventTitle: "A World Without HackerNews ",
        originalText: "A World Without HackerNews 30min"
      },
      {
        eventDuration: "30",
        eventTitle: "Programming in the Boondocks of Seattle ",
        originalText: "Programming in the Boondocks of Seattle 30min"
      },
      {
        eventDuration: "30",
        eventTitle: "Ruby vs. Clojure for Back­End Development ",
        originalText: "Ruby vs. Clojure for Back­End Development 30min"
      },
      {
        eventDuration: "30",
        eventTitle: "User Interface CSS in Rails Apps ",
        originalText: "User Interface CSS in Rails Apps 30min"
      },
      {
        eventDuration: "30",
        eventTitle: "Sit Down and Write ",
        originalText: "Sit Down and Write 30min"
      },
      {
        eventDuration: "20",
        eventTitle: "Writing Fast Tests Against Enterprise Rails ",
        originalText: "Writing Fast Tests Against Enterprise Rails 20min"
      },
      {
        eventDuration: "20",
        eventTitle: "Ruby on Rails Legacy App Maintenance ",
        originalText: "Ruby on Rails Legacy App Maintenance 20min"
      },
      {
        eventDuration: "20",
        eventTitle: "Ruby on Rails: Why We Should Move On ",
        originalText: "Ruby on Rails: Why We Should Move On 20min"
      },
      {
        eventDuration: "20",
        eventTitle: "Communicating Over Distance ",
        originalText: "Communicating Over Distance 20min"
      },
      {
        eventDuration: "20",
        eventTitle: "Rails Magic ",
        originalText: "Rails Magic 20min"
      },
      {
        eventDuration: "5",
        eventTitle: "Rails for Python Developers ",
        originalText: "Rails for Python Developers lightning"
      }
    ];
    let expectedResult = [
      [
        {
          eventTime: "09:00 AM",
          eventTitle: "Ruby Errors from Mismatched Gem Versions 45min"
        },
        {
          eventTime: "09:45 AM",
          eventTitle: "Pair Programming vs Noise 45min"
        },
        {
          eventTime: "10:30 AM",
          eventTitle: "Accounting­Driven Development 45min"
        },
        { eventTime: "11:15 AM", eventTitle: "Common Ruby Errors 45min" },
        { eventTime: "12:00PM", eventTitle: "Lunch" },
        {
          eventTime: "01:00 PM",
          eventTitle: "Clojure Ate Scala (on my project) 45min"
        },
        { eventTime: "01:45 PM", eventTitle: "Overdoing it in Python 45min" },
        { eventTime: "02:30 PM", eventTitle: "Lua for the Masses 30min" },
        { eventTime: "03:00 PM", eventTitle: "Woah 30min" },
        {
          eventTime: "03:30 PM",
          eventTitle: "A World Without HackerNews 30min"
        },
        {
          eventTime: "04:00 PM",
          eventTitle: "Programming in the Boondocks of Seattle 30min"
        },
        { eventTime: "04:30 PM", eventTitle: "Networking Event" }
      ],
      [
        {
          eventTime: "09:00 AM",
          eventTitle: "Ruby vs. Clojure for Back­End Development 30min"
        },
        {
          eventTime: "09:30 AM",
          eventTitle: "User Interface CSS in Rails Apps 30min"
        },
        { eventTime: "10:00 AM", eventTitle: "Sit Down and Write 30min" },
        {
          eventTime: "10:30 AM",
          eventTitle: "Writing Fast Tests Against Enterprise Rails 20min"
        },
        {
          eventTime: "10:50 AM",
          eventTitle: "Ruby on Rails Legacy App Maintenance 20min"
        },
        {
          eventTime: "11:10 AM",
          eventTitle: "Ruby on Rails: Why We Should Move On 20min"
        },
        {
          eventTime: "11:30 AM",
          eventTitle: "Communicating Over Distance 20min"
        },
        {
          eventTime: "12:10 AM",
          eventTitle: "Rails for Python Developers lightning"
        },
        {
          eventTime: "12:10 AM",
          eventTitle: "Rails for Python Developers lightning"
        },
        { eventTime: "12:00PM", eventTitle: "Lunch" },
        { eventTime: "04:00 PM", eventTitle: "Networking Event" }
      ]
    ];
    expect(Model.getScheduledEvents(preprocessData)).toEqual(expectedResult);
  });

  it("With empty array it should return [[]]", () => {
    expect(Model.getScheduledEvents([])).toEqual([[]]);
  });
});
