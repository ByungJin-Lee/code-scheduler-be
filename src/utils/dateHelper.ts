export const afterDay = (day: number) => {
  const date = new Date();

  date.setDate(date.getDate() + day);

  return date;
};

export const afterMinute = (minute: number) => {
  const date = new Date();

  date.setMinutes(date.getMinutes() + minute);

  return date;
};
