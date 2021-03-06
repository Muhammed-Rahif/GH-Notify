import React from "react";
import UpdateUserContent from "../components/UpdateAccessTokenContent/UpdateAccessTokenContent";

function UpdateAccessToken() {
  return (
    <div>
      {/* Header section */}
      <header>
        <h1 className="mb-0">GitHub Notify</h1>
        <small>Update your personal access token from here!</small>
      </header>
      <hr />
      <UpdateUserContent />
    </div>
  );
}

export default UpdateAccessToken;
