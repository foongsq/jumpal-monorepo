export const isDataPopulated = (data) => {
  return data && data.length !== 0 && data[0];
};

export const getPbTime = (time) => {
  time = new Date(time);
  // Create an array with the current month, day and time
  const date = [time.getMonth() + 1, time.getDate(), time.getFullYear()];

  // Return the formatted string
  return date.join("/");
};

export const getSdTime = (time) => {
  // Create an array with the current month, day and time
  const date = [time.getMonth() + 1, time.getDate(), time.getFullYear()];
  // Create an array with the current hour, minute and second
  const time2 = [time.getHours(), time.getMinutes(), time.getSeconds()];
  // Determine AM or PM suffix based on the hour
  const suffix = time2[0] < 12 ? "AM" : "PM";
  // Convert hour from military time
  time2[0] = time2[0] < 12 ? time2[0] : time2[0] - 12;
  // If hour is 0, set it to 12
  time2[0] = time2[0] || 12;
  // If minutes are less than 10, add a zero
  for (let i = 1; i < 2; i++) {
    if (time2[i] < 10) {
      time2[i] = "0" + time2[i];
    }
  }
  // Return the formatted string
  return date.join("/") + " " + time2.join(":") + " " + suffix;
};

export const getSdDbTime = (time) => {
  const dd = String(new Date(time).getDate()).padStart(2, "0");
  const mm = String(new Date(time).getMonth() + 1).padStart(2, "0");
  const yyyy = new Date(time).getFullYear();
  const date = `${yyyy}/${mm}/${dd}`;
  return date;
};
