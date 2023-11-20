import React from "react";
import FacebookLogin from "react-facebook-login";

import "./App.css";

// You can find your Page ID
// in the "About" section of your page on Facebook.
const PAGE_ID = "133126059881894";

function App() {
  // App state
  const [fbUserAccessToken, setFbUserAccessToken] = React.useState();
  const [fbPageAccessToken, setFbPageAccessToken] = React.useState();
  const [postText, setPostText] = React.useState();
  const [isPublishing, setIsPublishing] = React.useState(false);

  // Logs in a Facebook user
  const responseFacebook = (response) => {
    setFbUserAccessToken(response.accessToken);
  };

  // Logs out the current Facebook user
  const logOutOfFB = React.useCallback(() => {
    setFbUserAccessToken(null);
    setFbPageAccessToken(null);
  }, []);

  // Fetches an access token for the page
  React.useEffect(() => {
    if (fbUserAccessToken) {
      window.FB.api(
        `/${PAGE_ID}?fields=access_token&access_token=${fbUserAccessToken}`,
        ({ access_token }) => setFbPageAccessToken(access_token)
      );
    }
  }, [fbUserAccessToken]);

  // Publishes a post on the Facebook page
  const sendPostToPage = React.useCallback(() => {
    setIsPublishing(true);

    window.FB.api(
      `/${PAGE_ID}/feed`,
      "POST",
      {
        message: postText,
        access_token: fbPageAccessToken,
      },
      () => {
        setPostText("");
        setIsPublishing(false);
      }
    );
  }, [postText, fbPageAccessToken]);

  // UI with custom styling
  return (
    <div id="app">
      <h1>Facebook SDK Integration</h1>
      {fbUserAccessToken ? (
        <div>
          <p>User is logged in</p>
          <button onClick={logOutOfFB} className="btn confirm-btn">
            Log out
          </button>
          {fbPageAccessToken ? (
            <section className="app-section">
              <h3>Write something to the page</h3>
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Message..."
                rows="8"
                disabled={isPublishing}
              />
              <button
                onClick={sendPostToPage}
                className="btn confirm-btn"
                disabled={!postText || isPublishing}
              >
                {isPublishing ? "Publishing..." : "Publish"}
              </button>
            </section>
          ) : null}
        </div>
      ) : (
        <FacebookLogin
          appId="332909496116422"
          autoLoad={true}
          fields="name,email,picture"
          callback={responseFacebook}
        />
      )}
    </div>
  );
}

export default App;
