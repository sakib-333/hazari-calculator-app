import type { Action, InitState } from "@/interfaces/dataType";
import initState from "./initState";
import { TOGGLE_THEME } from "./actionTypes";

export const hazariCalculatorAppReducer = (state = initState, action: Action) => {
     let newState:InitState;

     switch (action.type) {
          case TOGGLE_THEME: 
               newState = {
                    ...state,
                    activeTheme: state.activeTheme === "light" ? "dark" : "light",
               }
          break;

          default:
               return state;              
     }

     localStorage.setItem("hazari-calculator-state", JSON.stringify(newState));

     return newState;
}
