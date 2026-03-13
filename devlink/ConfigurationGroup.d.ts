import * as React from "react";
import * as Types from "./types";

declare function ConfigurationGroup(props: {
  as?: React.ElementType;
  groupName?: React.ReactNode;
  selectBoxLabel?: React.ReactNode;
  groupInsertionSlot?: Types.Devlink.Slot;
}): React.JSX.Element;
