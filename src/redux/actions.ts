import type { Game } from "@/interfaces/dataType";
import { ADD_NEW_GAME, ADD_SCORE, DELETE_GAME, DELETE_LAST_SCORE, RESET_SCORES, TOGGLE_THEME } from "./actionTypes";

export const toggleTheme = () => ({
     type: TOGGLE_THEME
})

export const addNewGame = (gameData: Game) => ({
     type: ADD_NEW_GAME,
     gameData
})

export const deleteGame = (gameId: string) => ({
     type: DELETE_GAME,
     gameId
})

export const addScore = (gameId: string, scores: number[]) => ({
     type: ADD_SCORE,
     scores: [...scores],
     gameId
})

export const resetScores = (gameId: string) => ({
     type: RESET_SCORES,
     gameId
})

export const deleteLastScore = () => ({
     type: DELETE_LAST_SCORE,
})