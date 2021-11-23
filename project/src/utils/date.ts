import dayjs from 'dayjs';

const formatDate = (date: Date, format: string): string =>
  dayjs(date).format(format).toString();

export {
  formatDate
};
