export type BlockPosition = "pos1" | "pos2" | "pos3" | "pos4" | "pos5" | "pos6";

export type BuildingBlockType =
  | "single_door"
  | "double_door"
  | "cased_opening"
  | "sidelite"
  | "transom"
  | "flanker"
  | "head_detail";

export interface BuildObject {
  block_pos: BlockPosition;
  construction: BuildingBlockType;
  width: number;
  height: number;
  cols: number;
  rows: number;
  sr_top: number;
  sr_bottom: number;
  sr_left: number;
  sr_right: number;
  [key: string]: unknown;
}

export interface ComboSolution {
  build_objects: BuildObject[];
  [key: string]: unknown;
}

export interface StagedChanges {
  rows?: number;
  cols?: number;
}

export interface ConfiguratorState {
  selectedPosition: BlockPosition | null;
  stagedChanges: StagedChanges;
  hasChanges: boolean;
}

export type ConfiguratorAction =
  | { type: "SELECT_POSITION"; position: BlockPosition }
  | { type: "STAGE_CHANGE"; field: "rows" | "cols"; value: number }
  | { type: "SUBMIT_CHANGES" };
