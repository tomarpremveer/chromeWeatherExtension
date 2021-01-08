window.addEventListener("load", function () {
  document
    .getElementById("refreshButton")
    .addEventListener("click", function () {
      getPosition();
    });
});
function getPosition() {
  navigator.geolocation.getCurrentPosition(getCoords);
}
function getCoords(position) {
  document.getElementById("location").innerHTML = position.coords.latitude;
}
// chrome.storage.local.set({ location: location }, function () {
//   console.log("location is defined");
// });
