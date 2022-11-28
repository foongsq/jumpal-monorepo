import * as _ from "lodash";

/**
 * Example of raw personal best data from database.
  {
    “<Record ID>”: {
      learnt: true,
      progress: [],
      skillName: "Skill name",
      url: "http://www.example.com"
    },
  }
 */
interface RawSlData {
  [recordId: string]: RawSlRecord;
}

interface RawSlRecord {
  learnt: boolean;
  progress: Array<Array<string>>;
  skillName: string;
  url: string;
}

/**
 * Example of frontend structured personal best.
  [
    {
      "recordId": "<Record ID>",
      "learnt": true,
      "skillName": "Frog",
      "url": "www.example.com"
    }
  ]
 */
interface FeSlRecord {
  recordId: string;
  progress: Array<Array<string>>;
  learnt: boolean;
  skillName: string;
  url: string;
}

export const processSlData = (rawSlData: RawSlData): FeSlRecord[] => {
  const arr: FeSlRecord[] = [];
  for (const recordId in rawSlData) {
    if (_.has(rawSlData, recordId)) {
      const eventRecord = rawSlData[recordId];
      arr.push({ ...eventRecord, recordId });
    }
  }
  console.log("arr", arr);
  return arr;
};
