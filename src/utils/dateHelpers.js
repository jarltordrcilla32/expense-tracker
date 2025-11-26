/*
 * Everything related to dates
 */
export const getWeekNumber = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
  };
  
  export const getMonth = (date) => {
    return new Date(date).getMonth() + 1;
  };
  
  export const getQuarter = (date) => {
    const month = getMonth(date);
    return Math.ceil(month / 3);
  };
  
  export const getYear = (date) => {
    return new Date(date).getFullYear();
  };