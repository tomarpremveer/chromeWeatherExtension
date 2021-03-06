chrome.runtime.onInstalled.addListener(function () {
  navigator.geolocation.getCurrentPosition(
    (position) => {
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
    },
    (err) => {
      console.log(err);
    },
    { maximumAge: 10000, enableHighAccuracy: true }
  );
});
