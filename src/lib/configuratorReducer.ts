import type {
  ConfiguratorState,
  ConfiguratorAction,
  StagedChanges,
} from "@/types/configurator";
import { getBuildObject } from "./loadComboSolution";

export const initialState: ConfiguratorState = {
  selectedPosition: null,
  stagedChanges: {},
  hasChanges: false,
};

export function configuratorReducer(
  state: ConfiguratorState,
  action: ConfiguratorAction
): ConfiguratorState {
  switch (action.type) {
    case "SELECT_POSITION":
      return {
        selectedPosition: action.position,
        stagedChanges: {},
        hasChanges: false,
      };

    case "STAGE_CHANGE": {
      const newStaged: StagedChanges = {
        ...state.stagedChanges,
        [action.field]: action.value,
      };
      return {
        ...state,
        stagedChanges: newStaged,
        hasChanges: true,
      };
    }

    case "SUBMIT_CHANGES": {
      if (!state.selectedPosition || !state.hasChanges) {
        return state;
      }

      const solution = window.comboSolution;
      const block = getBuildObject(solution, state.selectedPosition);

      if (block) {
        if (state.stagedChanges.rows !== undefined) {
          block.rows = state.stagedChanges.rows;
        }
        if (state.stagedChanges.cols !== undefined) {
          block.cols = state.stagedChanges.cols;
        }
      }

      return {
        ...state,
        stagedChanges: {},
        hasChanges: false,
      };
    }

    default:
      return state;
  }
}
