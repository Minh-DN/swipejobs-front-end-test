/*
*   Formatting for 'Report To' Section
*/
export function getReportTo(personel) {
  const { name, phone } = personel;

  if (!phone) {
    return name;
  }

  return `${name} ${formatPhoneNum(phone)}`
}

function formatPhoneNum(phoneNum) {
  const splitNum = phoneNum.match(/.{1,3}/g);

  splitNum[0] = `(${splitNum[0]})`;

  return splitNum.join(' '); 
}

/*
*    Formatting for 'Shift Dates' Section
*/

const DAY_OF_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const MONTH = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];


export function getFormattedDate(shift) {
  const { startDate, endDate } = shift;

  const start = new Date(startDate);
  const end = new Date(endDate);

  const month = MONTH[start.getMonth()];
  const dayNum = start.getDate();
  const dayName = DAY_OF_WEEK[start.getDay()];

  const startTime = formatTime(start);
  const endTime = formatTime(end);

  const timeZone = getTimeZone(start)

  // e.g. APR 7, WED 8:00 AM - 10:00 PM AEST 
  const formattedDate = `${month} ${dayNum}, ${dayName} ${startTime} - ${endTime} ${timeZone}`; 

  return formattedDate;
}

function getTimeZone(date) {
  let localeTimeString = date.toLocaleTimeString('en-us', {timeZoneName:'long'});
  localeTimeString = localeTimeString.replace('AM', '');
  localeTimeString = localeTimeString.replace('PM', '');

  const uppercaseRegex = /[A-Z]/g;
  const match = localeTimeString.match(uppercaseRegex);
  const timeZone = match.join('');

  return timeZone;
}

function formatTime(date) {
  let hour = date.getHours();
  let minute = date.getMinutes().toString();
  let postfix = 'AM';

  if (hour > 12) {
    hour = hour - 12;
    postfix = 'PM';
  }
  
  if (minute.length === 1){
    minute = '0' + minute.slice(0);
  }

  const formattedTime = `${hour}:${minute} ${postfix}`

  return formattedTime;
}

