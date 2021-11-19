import type { NextPage } from "next";
import { App } from "../components";
import { GameApiClient } from "../external_services/game_api_client";

const Home: NextPage = () => {
  return <App columns={7} rows={6} client={new GameApiClient()} />;
};

export default Home;
