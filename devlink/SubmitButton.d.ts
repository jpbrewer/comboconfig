import * as React from "react";
import * as Types from "./types";

declare function SubmitButton(props: {
  as?: React.ElementType;
  variant?: "Base" | "Active" | "Inactive";
  link?: Types.Basic.Link;
  text?: React.ReactNode;
}): React.JSX.Element;
