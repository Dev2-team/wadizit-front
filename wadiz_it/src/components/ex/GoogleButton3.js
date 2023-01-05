import { GoogleLogin } from "@react-oauth/google";
import { gapi } from "gapi-script";
import React, { useEffect } from "react";

const clientId =
  "158243647020-3sfalldah686savtd37a2v63705u0vkr.apps.googleusercontent.com";

const GoogleButton3 = ({ onSocial }) => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId,
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (response) => {
    console.log(response);
  };

  const onFailure = (response) => {
    console.log(response);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="구글 로그인"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
};

export default GoogleButton3;
