const UNIT_DATE = 86400000;

export const normalizeDate = (date) => {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

export const parseDate = (date) => {
  const data = date.split('-');
  return {
    year: data[0],
    month: data[1],
    day: data[2],
  };
}

export const createArrayDate = (startDate, endDate) => {
  startDate = parseDate(startDate);
  endDate = parseDate(endDate);
  startDate = new Date(startDate.year, startDate.month-1, startDate.day);
  const timestampStartDate = startDate.getTime();
  endDate = new Date(endDate.year, endDate.month-1, endDate.day);
  const timestampEndDate = endDate.getTime();
  const duration = (timestampEndDate - timestampStartDate) / UNIT_DATE + 1;
  let arrayDate = [];
  for (let i = 0; i < duration; i++) {
    const newDate = normalizeDate(new Date(timestampStartDate + i *UNIT_DATE));
    console.log(newDate);
    arrayDate.push(newDate);
  }
  return {
    duration,
    data: arrayDate,
  }
}