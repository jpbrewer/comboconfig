"use client";

import { useReducer, useEffect, useMemo } from "react";
import { TabGroup } from "../../devlink/TabGroup";
import { PositionSelectorWrapper } from "./PositionSelectorWrapper";
import { LiteDesignGroup } from "./LiteDesignGroup";
import { SubmitButtonWrapper } from "./SubmitButtonWrapper";
import { configuratorReducer, initialState } from "@/lib/configuratorReducer";
import {
  getComboSolution,
  getOccupiedPositions,
  getBuildObject,
} from "@/lib/loadComboSolution";
import type { BlockPosition } from "@/types/configurator";
import styles from "./ConfigPanel.module.css";

interface ConfigPanelProps {
  className?: string;
}

export function ConfigPanel({ className }: ConfigPanelProps) {
  const [state, dispatch] = useReducer(configuratorReducer, initialState);

  const solution = useMemo(() => getComboSolution(), []);
  const occupiedPositions = useMemo(
    () => getOccupiedPositions(solution),
    [solution]
  );

  const selectedBlock = state.selectedPosition
    ? getBuildObject(solution, state.selectedPosition)
    : null;

  const displayRows =
    state.stagedChanges.rows ?? selectedBlock?.rows ?? 1;
  const displayCols =
    state.stagedChanges.cols ?? selectedBlock?.cols ?? 1;

  const handlePositionSelect = (position: BlockPosition) => {
    dispatch({ type: "SELECT_POSITION", position });
  };

  return (
    <div className={`${styles.container} ${className ?? ""}`}>
      <TabGroup
        tabSlot1={
          <>
            <PositionSelectorWrapper
              occupiedPositions={occupiedPositions}
              selectedPosition={state.selectedPosition}
              onSelect={handlePositionSelect}
            />
            {state.selectedPosition && selectedBlock && (
              <LiteDesignGroup
                rows={displayRows}
                cols={displayCols}
                onRowsChange={(value) =>
                  dispatch({ type: "STAGE_CHANGE", field: "rows", value })
                }
                onColsChange={(value) =>
                  dispatch({ type: "STAGE_CHANGE", field: "cols", value })
                }
              />
            )}
            <SubmitButtonWrapper
              hasChanges={state.hasChanges}
              onSubmit={() => dispatch({ type: "SUBMIT_CHANGES" })}
            />
          </>
        }
      />
    </div>
  );
}
