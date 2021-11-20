export interface CreateGame { }

export interface JoinGame {
  gameId: string;
}

export interface GetGame {
  gameId: string;
  playerId: string;
}

export interface MakeMove {
  gameId: string;
  playerId: string;
  column: number;
}

export enum Player {
  One = 1,
  Two = 2,
}

export enum Tile {
  Empty = 0,
  One = Player.One,
  Two = Player.Two,
}

export interface Game {
  gameId: string;
  active: boolean;
  playerId: string;
  playerNumber: Player;
  winner?: string;
  activePlayer: Player;
  board: Array<Array<Tile>>;
  playerCount: number;
}

function getApiUrl(location: Location): string {
  if (location.port === "3000") {
    // development
    return `http://localhost:5000`;
  } else {
    // kubernetes
    return `https://${location.host.replace("connect4.", "connect4-server.")}`;
  }
}

const API_URL = getApiUrl(window.location);

export class GameApiClient {
  createGame(body: CreateGame): Promise<Game> {
    return fetch(API_URL + "/create_game", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => (res["error"] === undefined ? res : undefined))
      .then((res) => res as Game);
  }

  joinGame(body: JoinGame): Promise<Game> {
    return fetch(API_URL + "/join_game", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => (res["error"] === undefined ? res : undefined))
      .then((res) => res as Game);
  }

  getGame(body: GetGame): Promise<Game> {
    const url = new URL(API_URL + "/get_game");
    url.search = new URLSearchParams({
      gameId: body.gameId,
      playerId: body.playerId,
    }).toString();
    return fetch(url.toString())
      .then((res) => res.json())
      .then((res) => (res["error"] === undefined ? res : undefined))
      .then((res) => {
        console.log(res);
        return res as Game;
      });
  }

  makeMove(body: MakeMove): Promise<Game> {
    return fetch(API_URL + "/make_move", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => (res["error"] === undefined ? res : undefined))
      .then((res) => {
        console.log(res);
        return res as Game;
      });
  }
}

const mockGame = (empty: boolean): Promise<Game> => {
  return new Promise((resolve) => {
    resolve({
      active: true,
      gameId: "JFKS343HD",
      playerId: "KFSN9823J",
      playerNumber: Player.One,
      winner: undefined,
      activePlayer: Player.One,
      playerCount: 2,
      board: [
        [
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
        ],
        [
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
        ],
        [
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
        ],
        [
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
        ],
        [
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
        ],
        [
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
        ],
        [
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
          Tile.Empty,
        ],
      ],
    });
  });
};

export class MockGameClient {
  createGame(_body: CreateGame): Promise<Game> {
    return mockGame(true);
  }

  joinGame(_body: JoinGame): Promise<Game> {
    return mockGame(true);
  }

  getGame(_body: GetGame): Promise<Game> {
    return mockGame(false);
  }

  makeMove(_body: MakeMove): Promise<Game> {
    return mockGame(false);
  }
}
