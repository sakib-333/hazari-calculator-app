import type { ADD_NEW_GAME, ADD_SCORE, DELETE_GAME, DELETE_LAST_SCORE, TOGGLE_THEME } from "@/redux/actionTypes";

export type Theme = "light" | "dark";

export interface Score {
     playerName: string;
     scores: number[],
}

export interface Game {
     gameId: string;
     score1: Score,
     score2: Score,
     score3: Score,
     score4: Score,
     gameOver: boolean;
}

export interface InitState {
     activeTheme: Theme
     games: Game[]
}

export interface Action {
     type: typeof TOGGLE_THEME | typeof ADD_NEW_GAME | typeof DELETE_GAME | typeof ADD_SCORE | typeof DELETE_LAST_SCORE;
     gameId: string;
     gameData?: Game;
     scores?: number[];
}