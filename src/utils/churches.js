export const formatChurches = (churches) => {
  return Object.values(churches).map((obj) => ({
    ...obj,
    slug: obj.name.split(' ').join(''),
  }));
};

export const monthNames = Object.freeze({
  '01': { name: 'January', acc: 'Jan' },
  '02': { name: 'February', acc: 'Feb' },
  '03': { name: 'March', acc: 'Mar' },
  '04': { name: 'April', acc: 'Apr' },
  '05': { name: 'May', acc: 'May' },
  '06': { name: 'June', acc: 'Jun' },
  '07': { name: 'July', acc: 'Jul' },
  '08': { name: 'August', acc: 'Aug' },
  '09': { name: 'September', acc: 'Sep' },
  '10': { name: 'October', acc: 'Oct' },
  '11': { name: 'November', acc: 'Nov' },
  '12': { name: 'December', acc: 'Dec' },
});
