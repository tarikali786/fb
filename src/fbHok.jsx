import React from "react";

// Injects the Facebook SDK into the page
// import React from "react";

// Injects the Facebook SDK into the page
const injectFbSDKScript = () => {
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
};

export const useInitFbSDK = () => {
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Initializes the SDK once the script has been loaded
  window.fbAsyncInit = function () {
    window.FB.init({
      // Replace 'your-app-id' with your actual App ID
      appId: "332909496116422;",
      cookie: true,
      xfbml: true,
      version: "v18.0",
    });

    window.FB.AppEvents.logPageView();
    setIsInitialized(true);
  };

  // Inject the Facebook SDK script
  injectFbSDKScript();

  return isInitialized;
};
