import type { Action, InitState } from "@/interfaces/dataType";
import initState from "./initState";
import { ADD_NEW_GAME, TOGGLE_THEME } from "./actionTypes";

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

    default:
      return state;
  }
};
