import React from "react";

function Step2() {
  return (
    <p>
      <h3 className="mb-0">
        <b>Step 3</b>
        <small> - Start Beomax telegram bot.</small>
      </h3>
      Go to our bot on telegram (
      <a rel="noreferrer" target="_blank" href="https://t.me/Beomax_bot">
        @Beomax_bot
      </a>
      ) and send message <code>/start</code> or <code>/register</code>.
      <div>
        <img className="m-1" src="assets/screenshots/start.png" alt="Start" />
      </div>
      You will get your registration link from there. Click on that link!
    </p>
  );
}

export default Step2;
