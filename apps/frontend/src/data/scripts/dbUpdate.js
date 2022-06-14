import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
import { ref, get, child, push } from "firebase/database";
import { config } from "../firebase/config.js";

const firebase = initializeApp({
  credential: applicationDefault(),
  databaseURL: config.databaseURL,
});
const db = getDatabase(firebase);

// Used to rename IgDb from "freestyle-saved-insta-urls" to
// "freestyle-saved-media-references", and also add timestamp to each record
async function renameIgDbAddTime() {
  const users = ref(db, "users");
  const snapshot = await get(users);
  const userIds = Object.keys(snapshot.val());
  console.log("userIds", userIds);
  userIds.forEach(async (userId) => {
    console.log("userId", userId);
    const user = child(users, userId);
    const oldFreestyleMedia = child(user, "freestyle_saved_media_references");
    const newFreestyleMedia = child(user, "freestyle-saved-media-references");
    const snapshot = await get(oldFreestyleMedia);
    const freestyleMediaRecords = snapshot.val();
    // console.log("freestylemediarecords", freestyleMediaRecords);
    for (const key in freestyleMediaRecords) {
      const record = freestyleMediaRecords[key];
      const note = record.note;
      const url = record.url;
      console.log("record", record);
      // console.log('note', note);
      // console.log('url', url);
      push(newFreestyleMedia, {
        note,
        url,
        timestamp: Date.now(),
      });
    }
  });
}
