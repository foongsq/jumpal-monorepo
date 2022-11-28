import * as _ from "lodash";

/**
 * Example of raw personal best data from database.
  {
    “1x30sec Double Unders”: {
      score: "60",
      time: "6/12/2022",
    },
    “1x30sec Running Step”: {
      score: "65",
      time: "6/12/2022",
    },
  }
 */
interface RawPbData {
  [eventName: string]: RawPbRecord;
}

interface RawPbRecord {
  score: string;
  time: string;
}

/**
 * Example of frontend structured personal best.
  [
    {
      event: “1x30sec Double Unders”,
      score: "60",
      time: "6/12/2022",
    },
    {
      event: “1x30sec Running Step”,
      score: "65",
      time: "6/12/2022",
    },
  ]
 */
interface FePbRecord {
  event: string;
  score: string;
  time: string;
}

export const processPbData = (rawPbData: RawPbData): FePbRecord[] => {
  const arr: FePbRecord[] = [];
  for (const eventName in rawPbData) {
    if (_.has(rawPbData, eventName)) {
      const eventRecord = rawPbData[eventName];
      arr.push({ ...eventRecord, event: eventName });
    }
  }
  return arr;
};
