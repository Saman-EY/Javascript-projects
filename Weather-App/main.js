let apiKey = "3045dd712ffe6e702e3245525ac7fa38";

let cityInput = document.getElementById("cityInput");
let addInput = document.getElementById("add");
let cityoutput = document.getElementById("cityoutput");
let descriptionoutput = document.getElementById("description");
let tempoutput = document.getElementById("temp");
let windoutput = document.getElementById("wind");

async function getweather() {
  let weatherdetail = await (
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}`
    )
  ).json();

  setinfo(weatherdetail);
}


let convertToCel = (value) => {
  return (value-273).toFixed(0);
}


function setinfo(data) {
  let cityName = data["name"];
  let description = data["weather"][0]["description"];
  let temprature = data["main"]["temp"];
  let wind = data["wind"]["speed"];

  cityoutput.innerHTML = `City: ${cityName}`;
  descriptionoutput.innerHTML = `Description:  ${description}`;
  tempoutput.innerHTML = `Temp: ${convertToCel(temprature)} C`;
  windoutput.innerHTML = `Speed: ${wind} KM/H`;
}

  // CLICK ENTER TO SHOW 
cityInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter"){
    addInput.click();
  }
})



addInput.addEventListener("click", getweather);

//json==>
// {
//   "coord": {
//       "lon": 51.4215,
//       "lat": 35.6944
//   },
//   "weather": [
//       {
//           "id": 800,
//           "main": "Clear",
//           "description": "clear sky",
//           "icon": "01n"
//       }
//   ],
//   "base": "stations",
//   "main": {
//       "temp": 279.66,
//       "feels_like": 278.49,
//       "temp_min": 279.66,
//       "temp_max": 280.14,
//       "pressure": 1021,
//       "humidity": 61
//   },
//   "visibility": 10000,
//   "wind": {
//       "speed": 1.79,
//       "deg": 310
//   },
//   "clouds": {
//       "all": 0
//   },
//   "dt": 1638561620,
//   "sys": {
//       "type": 2,
//       "id": 47737,
//       "country": "IR",
//       "sunrise": 1638502053,
//       "sunset": 1638537662
//   },
//   "timezone": 12600,
//   "id": 112931,
//   "name": "Tehran",
//   "cod": 200
// }
