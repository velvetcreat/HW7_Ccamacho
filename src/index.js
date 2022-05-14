//Current time function
let now = new Date();
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    " Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(now);

//search engine function
//                Search button activation
let showCurrentCity = document.querySelector("#search-city");
showCurrentCity.addEventListener("click", showCity);

//              connecting axios & Open Weather API &&
//               New search updating HTML// Display City
function showCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#city-input").value;
  let place = document.querySelector("#current-city");
  place.innerHTML = `${currentCity}`;

  let apiKey = "7a25c6b2ec87adec4dc53604efe82144";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentTemp);
}
//             Updated HTML with current temperature
function showCurrentTemp(response) {
  let cityTemp = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#current-temp");
  degrees.innerHTML = `${cityTemp} °F`;

  let cityDescription = response.data.weather[0].main.description;
  let description = document.querySelector(".description");
  description.innerHTML = `Weather outlook: ${cityDescription}`;

  let humidityTemp = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${humidityTemp}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${wind}km/h`;
}

//3.bonus: Display a fake temperature (i.e 17) in Celsius
//and add a link to convert it to Fahrenheit.
//                    imperial unit
function convertToFahrenheit(event) {
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = "80°F / 72°F";
}
let fahrenheitLink = document.querySelector("#fahr-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
//                    metric unit
function convertToCelsius(event) {
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = "28°C / 22°C";
}
let celsiusLink = document.querySelector("#cel-link");
celsiusLink.addEventListener("click", convertToCelsius);

//Bonus:Current location button & temperature

//              1.Current trigger button
let currentButton = document.querySelector(".currentButton");
currentButton.addEventListener("click", retrievePosition);
//                 2.Using navigator geolocater
function retrievePosition(position) {
  navigator.geolocation.getCurrentPosition(currentPosition);
}
//                3. Gathering API data
function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "7a25c6b2ec87adec4dc53604efe82144";
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndPoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showAreaTemp);
}
//              4. updating the Temperature HTML
function showAreaTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = `${currentTemp}°F`;

  let currentCity = response.data.name;
  let place = document.querySelector("#current-city");
  place.innerHTML = currentCity;

  let currentDescription = response.data.weather[0].main;
  let description = document.querySelector(".description");
  description.innerHTML = `Weather outlook: ${currentDescription}`;
}
