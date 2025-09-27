import type { InitState } from "@/interfaces/dataType";

const defaultState: InitState = {
  activeTheme: "light",
  games: [],
};

function loadState(): InitState {
  try {
    const localState = localStorage.getItem("hazari-calculator-state");
    if (!localState) return defaultState;

    const parsed = JSON.parse(localState) as Partial<InitState>;

    return {
      ...defaultState,
      ...parsed,
      // In case parsed.games is missing or invalid, fallback to empty array
      games: Array.isArray(parsed.games) ? parsed.games : [],
    };
  } catch (error) {
    console.error("Failed to load state from localStorage:", error);
    return defaultState;
  }
}

const initState: InitState = loadState();

export default initState;
