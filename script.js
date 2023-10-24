const apiKey = "7890217d278dd6e5ba31fed1007fafb0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
const temprature = document.querySelector(".temp");
const city = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather-icon");
const info = document.querySelector('.weather')
function clicked() {
  const searchCity = document.getElementById("input").value;
  async function checkWeather(cityName) {
    const response = await fetch(`${apiUrl}&q=${cityName}&appid=${apiKey}`);
    let data = await response.json();
    console.log(data);
    if (response.status == 404){
        city.textContent = "city not found";
        temprature.textContent = `--`;
        humidity.textContent = `--`;
        wind.textContent = `--`;
        weatherIcon.setAttribute("src", `images/sad.png`);
    } else if (response.status == 401) {
        city.textContent = "couldn't connect with db";
        temprature.textContent = `--`;
        humidity.textContent = `--`;
        wind.textContent = `--`;
        weatherIcon.setAttribute("src", `images/sad.png`);
    }
    else {
      const icondata = data?.weather[0]?.main;
      city.textContent = data.name;
      temprature.textContent = `${Math.round(data?.main?.temp)}°C`;
      humidity.textContent = `${data?.main?.humidity}%`;
      wind.textContent = `${data?.wind?.speed}km/hr`;
      weatherIcon.setAttribute("src", `images/${icondata.toLowerCase()}.png`);
    }
    info.classList.remove('hidden')
  }
  checkWeather(searchCity);
}
