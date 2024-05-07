module.exports = (date, time) => {
  const dateTimeString = `${date.toISOString().substring(0, 10)}T${time}:00`;
  const googleDateTime = new Date(dateTimeString).toISOString();
  return googleDateTime;
};
