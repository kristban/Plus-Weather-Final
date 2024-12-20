function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    minutes = `0${hours}`;
  }

  return `${formattedDay} ${hours}:${minutes}`
}

let currentDateElement = document.querySelector("#currentDate");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);
