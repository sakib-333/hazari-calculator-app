import type { Action, InitState } from "@/interfaces/dataType";
import initState from "./initState";
import { ADD_NEW_GAME, ADD_SCORE, DELETE_GAME, TOGGLE_THEME } from "./actionTypes";

export const hazariCalculatorAppReducer = (state: InitState = initState, action: Action): InitState => {
  switch (action.type) {
    case TOGGLE_THEME: {
      const newState: InitState = {
        ...state,
        activeTheme: state.activeTheme === "light" ? "dark" : "light",
      };
      localStorage.setItem("hazari-calculator-state", JSON.stringify(newState));
      return newState;
    }

    case ADD_NEW_GAME: {
      if (!action.gameData) return state;
      const newState: InitState = {
        ...state,
        games: [action.gameData, ...state.games],
      };
      localStorage.setItem("hazari-calculator-state", JSON.stringify(newState));
      return newState;
    }
    
    case DELETE_GAME: {
      if (!action.gameId) return state;
      const newState: InitState = {
        ...state,
        games: state.games.filter(g => g.gameId !== action.gameId),
      }
      localStorage.setItem("hazari-calculator-state", JSON.stringify(newState));
      return newState;
    }
    
    case ADD_SCORE:
      if (!action.scores?.length) return state;
      const [s1, s2, s3, s4] = action.scores;
      const newState: InitState = {
        ...state,
        games: state.games.map((game) => {
          if(game.gameId !== action.gameId) return game;
          
          return {
            ...game,
            score1: {
              ...game.score1,
              scores: [...game.score1?.scores, s1],
            },
            score2: {
              ...game.score2,
              scores: [...game.score2?.scores, s2],
            },
            score3: {
              ...game.score3,
              scores: [...game.score3?.scores, s3],
            },
            score4: {
              ...game.score4,
              scores: [...game.score4?.scores, s4],
            },
          }
        })
      }
      const game = state.games.find((game) => game.gameId === action.gameId);
      if(game) {
        const s1 = game.score1.scores.reduce((acc, curr) => acc + curr, 0);
        const s2 = game.score2.scores.reduce((acc, curr) => acc + curr, 0);
        const s3 = game.score3.scores.reduce((acc, curr) => acc + curr, 0);
        const s4 = game.score4.scores.reduce((acc, curr) => acc + curr, 0);


        if(s1 >= 1000 || s2 >= 1000 || s3 >= 1000 || s4 >= 1000) {
          newState.games.forEach(game => {
            if(game.gameId === action.gameId) {
              game.gameOver = true;
            }
          })
        }
      }
      localStorage.setItem("hazari-calculator-state", JSON.stringify(newState));
      return newState;

    default:
      return state;
  }
};
