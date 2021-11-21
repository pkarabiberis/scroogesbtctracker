export const getDate = (ms: number) => {
  const currentDay = new Date(ms).getUTCDate();
  const currentMonth = new Date(ms).getUTCMonth() + 1;
  const currentYear = new Date(ms).getUTCFullYear();
  return `${currentDay}-${currentMonth}-${currentYear}`;
};
