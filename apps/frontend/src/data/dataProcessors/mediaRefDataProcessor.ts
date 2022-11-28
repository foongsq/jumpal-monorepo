import * as _ from "lodash";

/**
 * Example of raw media reference data from database.
  {
    <Media Reference ID>: {
      note: "Media reference 1",
      url: "https://www.jumprope.com",
    },
    <Media Reference ID>: {
      note: "Media reference 2",
      url: "https://www.jumprope.com",
    },
  }
 */
interface RawMediaRefData {
  [mediaRefId: string]: RawMediaRefRecord;
}

interface RawMediaRefRecord {
  note: string;
  url: string;
}

/**
 * Example of frontend structured media reference.
  [
    {
      id: <Media Reference ID>,
      note: "Media reference 1",
      url: "https://www.jumprope.com",
    },
    {
      event: <Media Reference ID>,
      note: "Media reference 2",
      url: "https://www.jumprope.com",
    },
  ]
 */
interface FeMediaRefRecord {
  id: string;
  note: string;
  url: string;
}

export const processMediaRefData = (
  rawMediaRefData: RawMediaRefData
): FeMediaRefRecord[] => {
  const arr: FeMediaRefRecord[] = [];
  for (const mediaRefId in rawMediaRefData) {
    if (_.has(rawMediaRefData, mediaRefId)) {
      const mediaRefRecord: RawMediaRefRecord = rawMediaRefData[mediaRefId];
      arr.push({ ...mediaRefRecord, id: mediaRefId });
    }
  }
  return arr;
};
