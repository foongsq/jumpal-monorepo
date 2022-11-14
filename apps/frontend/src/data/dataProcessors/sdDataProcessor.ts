/* eslint-disable guard-for-in */
// import * as _ from "lodash";

/**
 * Example of raw speed record data from database.
  {
    “<Record ID>”: {
      event: "1x30sec Running Step",
      score: "60",
      time: "6/12/2022 time",
    },
    “<Record ID>”: {
      event: "1x30sec Running Step",
      score: "65",
      time: "6/13/2022 time",
    },
  }

  Example of speed record by date data from database.
  {
    “6/12/2022”: { 
      "<Record ID>": true,
      "<Record ID>": true,
    },
    “6/13/2022”: {
      "<Record ID>": true,
      "<Record ID>": true,
    },
  }
 */
interface RawSpeedRecords {
  [year: string]: YearRecords;
}

interface YearRecords {
  [month: string]: MonthRecords;
}

interface MonthRecords {
  [day: string]: DayRecord;
}

interface DayRecord {
  [id: string]: SpeedRecord;
}

interface SpeedRecord {
  event: string;
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
interface FeSpeedRecord {
  event: string;
  score: string;
  time: string;
}

export const processSpeedRecord = (
  rawSpeedRecords: RawSpeedRecords
): FeSpeedRecord[] => {
  const consolidated: FeSpeedRecord[] = [];
  for (const year in rawSpeedRecords) {
    for (const month in rawSpeedRecords[year]) {
      for (const day in rawSpeedRecords[year][month]) {
        const records = rawSpeedRecords[year][month][day];
        for (const id in records) {
          const record: FeSpeedRecord = records[id];
          consolidated.push(record);
        }
      }
    }
  }
  // Sort records in ascending order according to time
  return consolidated.sort((a, b) =>
    new Date(a.time) > new Date(b.time) ? -1 : 1
  );
};

export const filterTodayRecords = (
  records: FeSpeedRecord[]
): FeSpeedRecord[] => {
  const consolidated: FeSpeedRecord[] = [];
  const today = new Date();
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1); // January is 0!
  const yyyy = today.getFullYear();
  const todayStr = `${mm}/${dd}/${yyyy}`;
  for (const key in records) {
    const record = records[key];
    const splitTime = record.time.split(" ");
    if (splitTime[0] === todayStr) {
      consolidated.push(record);
    }
  }
  return consolidated;
};
