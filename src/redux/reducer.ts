import type { Action, InitState } from "@/interfaces/dataType";
import initState from "./initState";
import { ADD_NEW_GAME, ADD_SCORE, DELETE_GAME, DELETE_LAST_SCORE, RESET_SCORES, TOGGLE_THEME } from "./actionTypes";

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
      
      case DELETE_LAST_SCORE: {
        if (!action.gameId) return state;
        const newState = {
          ...state,
          games: state.games.map(g => {
            if(g.gameId !== action.gameId) return g;
            return {
              ...g,
              score1: {...g.score1, scores: g.score1.scores.slice(0, g.score1.scores.length-1)},
              score2: {...g.score2, scores: g.score2.scores.slice(0, g.score2.scores.length-1)},
              score3: {...g.score3, scores: g.score3.scores.slice(0, g.score3.scores.length-1)},
              score4: {...g.score4, scores: g.score3.scores.slice(0, g.score3.scores.length-1)},
            } 
          })
        }
        localStorage.setItem("hazari-calculator-state", JSON.stringify(newState));
        return newState;
      }
      
      case RESET_SCORES: {
        if (!action.gameId) return state;
        const newState = {
          ...state,
          games: state.games.map(g => {
            if(g.gameId !== action.gameId) return g;
            
            return {
              ...g,
              score1: {...g.score1, scores: []},
              score2: {...g.score2, scores: []},
              score3: {...g.score3, scores: []},
              score4: {...g.score4, scores: []},
              gameOver: false,
            }
          })
        }
        localStorage.setItem("hazari-calculator-state", JSON.stringify(newState));
        return newState;
      }

    default:
      return state;
  }
};
