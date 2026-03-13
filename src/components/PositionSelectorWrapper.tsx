"use client";

import { useEffect, useRef, useCallback } from "react";
import { PositionSelector } from "../../devlink/PositionSelector";
import posStyles from "../../devlink/PositionSelector.module.css";
import type { BlockPosition } from "@/types/configurator";

interface PositionSelectorWrapperProps {
  occupiedPositions: Set<BlockPosition>;
  selectedPosition: BlockPosition | null;
  onSelect: (position: BlockPosition) => void;
}

const ALL_POSITIONS: BlockPosition[] = ["pos1", "pos2", "pos3", "pos4", "pos5", "pos6"];

export function PositionSelectorWrapper({
  occupiedPositions,
  selectedPosition,
  onSelect,
}: PositionSelectorWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const buttons = wrapperRef.current.querySelectorAll<HTMLElement>("[data-pos-selector]");

    buttons.forEach((button) => {
      const pos = button.getAttribute("data-pos-selector") as BlockPosition;

      // Remove all three state classes
      button.classList.remove(
        posStyles["inactive-pos"],
        posStyles["active-pos"],
        posStyles["selected-pos"]
      );

      if (pos === selectedPosition) {
        button.classList.add(posStyles["selected-pos"]);
      } else if (occupiedPositions.has(pos)) {
        button.classList.add(posStyles["active-pos"]);
      } else {
        button.classList.add(posStyles["inactive-pos"]);
      }
    });
  }, [occupiedPositions, selectedPosition]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();

      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-pos-selector]");
      if (!target) return;

      const pos = target.getAttribute("data-pos-selector") as BlockPosition;
      if (!pos || !ALL_POSITIONS.includes(pos)) return;

      if (occupiedPositions.has(pos)) {
        onSelect(pos);
      }
    },
    [occupiedPositions, onSelect]
  );

  return (
    <div ref={wrapperRef} onClick={handleClick}>
      <PositionSelector />
    </div>
  );
}
