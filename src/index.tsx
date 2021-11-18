import React from 'react';
import ReactDOM from 'react-dom';
import { App } from "./components";
import { GameApiClient } from "./external_services/game_api_client";
import './index.css';

ReactDOM.render(
  <App columns={7} rows={6} client={new GameApiClient()} />,
  document.getElementById("root")
);
