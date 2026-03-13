"use client";

console.warn(
  "⚠️ Avoid importing components from 'index.js' for better performance. This practice is deprecated and may be removed in the future."
);

export * as _Builtin from "./_Builtin";
export * from "./ConfigurationGroup";
export * from "./devlink";
export * from "./devlinkContext";
export * from "./DevLinkProvider";
export * from "./interactions";
export * from "./MeasurementSelectBox";
export * from "./PositionSelector";
export * from "./SelectBox";
export * from "./SubmitButton";
export * from "./TabGroup";
export * from "./Test";
export * from "./utils";
export * from "./values/Builtin/formatNumber";
