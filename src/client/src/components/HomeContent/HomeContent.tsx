import React from "react";

function HomeContent() {
    return (
        <article>
            {/* Step 1 */}
            <h3 className="mb-0">Step 1</h3>
            <h6 className="mb-0">
                Go to our bot on telegram (
                <a href="https://t.me/Beomax_bot">@Beomax_bot</a>) and send
                message <code>/start</code> or <code>/register</code>.
            </h6>
            <img
                className="m-1"
                src="assets/screenshots/step1.png"
                alt="Step 1"
            />
            <h6>
                You will get your registration link from there. Click on that
                link!
            </h6>

            <hr />

            {/* Step 2 */}
            <h3 className="mb-0">Step 2</h3>
            <h6 className="mb-0">Get your GitHub personal access token.</h6>
            <p>
                <small>
                    Create a personal access token on GitHub with permission to
                    access your notifications.{" "}
                    <img
                        className="m-1"
                        src="assets/screenshots/step2.png"
                        alt="Step 2"
                    />
                </small>
            </p>

            <hr />
        </article>
    );
}

export default HomeContent;
