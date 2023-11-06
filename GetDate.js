
export const getCorrectDate = () => {
let currentDate = new Date();

  let date = currentDate.getDate();
  let year = currentDate.getFullYear().toString().slice(-2);
  let month = currentDate.getMonth();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  if (date < 10) {
    date = '0' + date
  }
  if (month < 10) {
    month = '0' + month
  }
  if (hours < 10) {
    hours = '0' + hours
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  const newDate = date + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
}