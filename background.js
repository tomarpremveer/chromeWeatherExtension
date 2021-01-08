chrome.runtime.onInstalled.addListener(function () {
  navigator.geolocation.getCurrentPosition((position) => {
    chrome.storage.sync.set({ location: location }, function () {
      console.log("location is defined");
    });
  });
});
