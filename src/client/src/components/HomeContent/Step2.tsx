import React from "react";

function Step1() {
    return (
        <p>
            <h3 className="mb-0">
                <b>Step 2</b>
                <small> - Get your GitHub personal access token.</small>
            </h3>
            Create a personal access token from GitHub with permission to access
            your notifications.{" "}
            <div>
                <img
                    className="m-1"
                    src="assets/screenshots/permissions.png"
                    alt="Permission"
                />
            </div>
            <small>
                <i>
                    For more help for creating personal access token on GitHub,{" "}
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
                    >
                        Read this.
                    </a>
                </i>
            </small>
            <br />
            After all, generate your access token and <mark>copy it</mark>.
            <img
                className="m-1"
                src="assets/screenshots/copy-token.png"
                alt="Copy token"
            />
        </p>
    );
}

export default Step1;
