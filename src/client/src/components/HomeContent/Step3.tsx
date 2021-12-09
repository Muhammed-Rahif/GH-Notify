import React from "react";

function Step3() {
    return (
        <p>
            <h3 className="mb-0">
                <b>Step 3</b>
                <small> - Registration.</small>
            </h3>
            Fill the form!
            <br />
            <small>
                Your GitHub username, personal access token ( paste the copied
                token in here )!
            </small>
            <div>
                <img
                    src="assets/screenshots/registration.png"
                    alt="Registration"
                    className="m-1"
                />
            </div>
            And{" "}
            <b>
                <ins>SUBMIT</ins>
            </b>{" "}
            the form.
            <hr />
            <h4 className="m-auto">
                <u>Congratulations!!!</u> You all set, you will get GitHub
                notifications instantly from our Telegram bot.
            </h4>
        </p>
    );
}

export default Step3;
