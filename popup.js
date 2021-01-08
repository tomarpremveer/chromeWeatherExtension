window.addEventListener("load", function () {
  getWeatherUpdates();
  //document.getElementById("location").innerHTML =Object.keys(obj).toString() || "No key";
  document
    .getElementById("refreshButton")
    .addEventListener("click", refreshPosition);
});
/*
Function used to get weather updated from  the saved coordinates from the storage
*/
function getWeatherUpdates() {
  chrome.storage.sync.get("location", function (obj) {
    const { latitude: lat, longitude: long } = obj.location;
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=d1dda39918d5ab210e15f3f067c2a9d6`
    )
      .then((response) => response.json())
      .then((json) => {
        const elementsWithValue = {
          image: `${json.weather[0].main}.png`,
          location: json.name,
          description: json.weather[0].description,
        };
        updateElements(elementsWithValue);
      });
  });
}
function updateElements(elementsWithValue) {
  const elements = Object.keys(elementsWithValue);
  if (elements.length > 1) {
    for (let ele of elements) {
      if (ele == "image") {
        document.getElementById(ele).src = elementsWithValue[ele];
      } else document.getElementById(ele).innerHTML = elementsWithValue[ele];
    }
  }
}
/*
Function to refresh position of a user 
on the click of refresh button
*/
function refreshPosition() {
  getCurrentPosition();
}
/*
Function to get the current Position of the user
*/
function getCurrentPosition() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(getCoordinates);
  }
}
/*
function to get the coordinates(latitude,longitude)
from the geolocation object provided by the getCurrentPosition
This function is passed as callback to the `getCurrentPosition` function
*/
function getCoordinates(position) {
  chrome.storage.sync.set(
    {
      location: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
    },
    function () {
      console.log("location is defined");
    }
  );
}
/*
Function to run in case the navigator.geolocation fails
This function is passed as the failed callback to `getCurrenPosition` function
*/
