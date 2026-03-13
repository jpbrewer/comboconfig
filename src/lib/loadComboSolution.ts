import type { BlockPosition, BuildObject, ComboSolution } from "@/types/configurator";
import exampleData from "../../example.json";

declare global {
  interface Window {
    comboSolution: ComboSolution;
  }
}

let initialized = false;

export function getComboSolution(): ComboSolution {
  if (typeof window === "undefined") {
    return exampleData as unknown as ComboSolution;
  }

  if (!initialized) {
    window.comboSolution = JSON.parse(JSON.stringify(exampleData)) as ComboSolution;
    initialized = true;
  }

  return window.comboSolution;
}

export function getOccupiedPositions(solution: ComboSolution): Set<BlockPosition> {
  const positions = new Set<BlockPosition>();

  for (const block of solution.build_objects) {
    if (block.construction === "head_detail" || block.block_pos === ("pos7" as BlockPosition)) {
      continue;
    }
    positions.add(block.block_pos);
  }

  return positions;
}

export function getBuildObject(
  solution: ComboSolution,
  position: BlockPosition
): BuildObject | undefined {
  return solution.build_objects.find((b) => b.block_pos === position);
}
