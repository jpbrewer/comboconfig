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
        if (state.stagedChanges.sr_top !== undefined) {
          block.sr_top = state.stagedChanges.sr_top;
        }
        if (state.stagedChanges.sr_bottom !== undefined) {
          block.sr_bottom = state.stagedChanges.sr_bottom;
        }
        if (state.stagedChanges.sr_left !== undefined) {
          block.sr_left = state.stagedChanges.sr_left;
        }
        if (state.stagedChanges.sr_right !== undefined) {
          block.sr_right = state.stagedChanges.sr_right;
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
