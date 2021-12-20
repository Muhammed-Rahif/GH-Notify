import React from "react";
import HomeContent from "../components/HomeContent/HomeContent";

function Home() {
  return (
    <div>
      {/* Header section */}
      <header>
        <h1 className="mb-0">GitHub Notify</h1>
        <small>Get your GitHub notifications on telegram..!</small>
      </header>
      <hr />
      <HomeContent />
    </div>
  );
}

export default Home;
