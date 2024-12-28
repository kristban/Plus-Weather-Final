function updateWeather(response) {
  let temperatureElement = document.querySelector("#today-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");

  let date = new Date(response.data.time * 1000);

  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity} %`;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    minutes = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "7a9df9a4f940btc116d43db796o3aa67";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiURL).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-field");

  searchCity(searchInput.value);
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "7a9df9a4f940btc116d43db796o3aa67";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiURL).then(displayForecast);
}

function displayForecast(response) {
  

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
          <div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDate(day.time)}</div>
            <div>
              <img src="${
                day.condition.icon_url
              }"class="weather-forecast-icon" />
              </div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}º</strong>
              </div>
                <div class="weather-forecast-temperature">${Math.round(
                  day.temperature.minimum
                )}º</div>
            </div>
          </div>
        `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFieldElement = document.querySelector("#search-form");
searchFieldElement.addEventListener("submit", handleSearchSubmit);

searchCity("Cork");

