export const isDataPopulated = (data) => {
  return data && data.length !== 0 && data[0];
};

export const timeStamp = (time) => {
  time = new Date(time);
  // Create an array with the current month, day and time
  const date = [time.getMonth() + 1, time.getDate(), time.getFullYear()];

  // Return the formatted string
  return date.join('/');
};
