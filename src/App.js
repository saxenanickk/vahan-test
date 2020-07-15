import React from "react";
import "./App.css";

import Tabs from "./components/Tabs";
import Chats from "./containers/Chats";
import Jobs from "./containers/Jobs";
import Profile from "./containers/Profile";
import NetworkDetector from "./Utils/NetworkDetector";

function App() {
  return (
    <div className="container">
      <header className="header">
        <p>Job Finder</p>
      </header>
      <Tabs>
        <div label="CHAT">
          <Chats />
        </div>
        <div label="MY JOBS">
          <Jobs />
        </div>
        <div label="PROFILE">
          <Profile />
        </div>
      </Tabs>
    </div>
  );
}

export default NetworkDetector(App);
