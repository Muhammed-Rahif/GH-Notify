import React from "react";

function Step1() {
    return (
        <p>
            <h3 className="mb-0">
                <b>Step 1</b>
                <small> - Star our repository.</small>
            </h3>
            You must <b>need to star our repository</b> on GitHub to complete
            the registration. Star our repo{" "}
            <a
                rel="noreferrer"
                target="_blank"
                href="https://github.com/Muhammed-Rahif/GH-Notify/stargazers"
            >
                from here.!
            </a>
            <div>
                <img
                    src="assets/screenshots/star-repo.png"
                    alt="Star repo"
                    className="m-1"
                />
            </div>
            <mark>
                If you didn't star, registration will fail. And keep in mind if
                you remove star from our repo after registration you will not
                get notifications from our bot.
            </mark>
        </p>
    );
}

export default Step1;
