import React from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

function HomeContent() {
  return (
    <article>
      <Step1 />
      <hr />
      <Step2 />
      <hr />
      <Step3 />
      <hr />
      <Step4 />
      <hr />
    </article>
  );
}

export default HomeContent;
