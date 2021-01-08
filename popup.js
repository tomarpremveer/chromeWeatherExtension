window.addEventListener("load", function () {
  document
    .getElementById("refreshButton")
    .addEventListener("click", function () {
      let location = getLocation();
    });
});
function getLocation() {
  var location;
  navigator.geolocation.getCurrentPosition((position) => {
    location = position;
    chrome.storage.local.set({ location: location }, function () {
      console.log("location is defined");
    });
  });
  return location;
}
