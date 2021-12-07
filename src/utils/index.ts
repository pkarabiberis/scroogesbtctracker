export const getDate = (ms: number) => {
  const currentDay = new Date(ms).getUTCDate();
  const currentMonth = new Date(ms).getUTCMonth() + 1;
  const currentYear = new Date(ms).getUTCFullYear();
  return `${currentDay}-${currentMonth}-${currentYear}`;
};

export const getUserFriendlyText = (downwardTrend?: number | null) => {
  let userFriendlyText = '';
  if (downwardTrend === 0) {
    userFriendlyText = "Didn't decrease";
  } else if (downwardTrend === 1) {
    userFriendlyText = '1 day in a row';
  } else {
    userFriendlyText = `${downwardTrend} days in a row`;
  }

  return userFriendlyText;
};

export const formatMaxDate = () => {
  const now = new Date();

  const currentDay =
    now.getDate() + 1 < 10 ? `0${now.getDate()}` : `${now.getDate()}`;

  const currentMonth =
    now.getMonth() + 1 < 10
      ? `0${now.getMonth() + 1}`
      : `${now.getMonth() + 1}`;

  return `${now.getFullYear().toString()}-${currentMonth}-${currentDay}`;
};
