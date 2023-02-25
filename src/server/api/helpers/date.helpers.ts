export const getDateRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate() + 1
  );

  return { start, end };
};

export const getMonthRange = () => {
  const start = new Date();
  const end = new Date();

  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  end.setMonth(start.getMonth() + 1);
  end.setDate(1);
  end.setHours(0, 0, 0, 0);

  return { start, end };
};
