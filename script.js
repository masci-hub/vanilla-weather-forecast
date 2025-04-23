function formatDate(date) {
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
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function displayWeather(response) {
  let temperatureValue = document.querySelector("#temperature-value");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  let city = response.data.city;
  let conditionElement = document.querySelector("#condition");
  let condition = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  let dateElement = document.querySelector("#date");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  let icon = `<img src="${response.data.condition.icon_url}" class="temperature-icon" />`;

  iconElement.innerHTML = icon;
  dateElement.innerHTML = formatDate(date);
  windElement.innerHTML = `${wind}km/h`;
  humidityElement.innerHTML = `${humidity}%`;
  conditionElement.innerHTML = condition;
  cityElement.innerHTML = city;
  temperatureValue.innerHTML = temperature;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "733615547b11515efo464ab9111t0c1b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "733615547b11515efo464ab9111t0c1b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      let maxTemp = Math.round(day.temperature.maximum);
      let minTemp = Math.round(day.temperature.minimum);
      let icon = `<img src="${day.condition.icon_url}" class="weather-forecast-icon" />`;

      forecastHtml += `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <div>${icon}</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${maxTemp}°</strong>
          </div>
          <div class="weather-forecast-temperature">${minTemp}°</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

searchCity("Rome");
