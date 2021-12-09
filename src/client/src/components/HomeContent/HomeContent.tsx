import React from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

function HomeContent() {
    return (
        <article>
            <Step1 />
            <hr />
            <Step2 />
            <hr />
            <Step3 />
            <hr />
        </article>
    );
}

export default HomeContent;
