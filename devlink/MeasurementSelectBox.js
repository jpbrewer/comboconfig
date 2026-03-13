"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./MeasurementSelectBox.module.css";

export function MeasurementSelectBox({
  as: _Component = _Builtin.Block,
  label = "Claude put label for SelectBox here.",
  selectInsertionSlot,
  selectInsertionFrac,
  selectInsertionInch,
}) {
  return (
    <_Component className={_utils.cx(_styles, "select-overall-box")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "select-text-label")}
        tag="div"
      >
        {label}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "double-select-wrapper-left")}
        tag="div"
        data-insertion-point="double_select_inch"
      >
        {selectInsertionInch}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "double-select-wrapper-right")}
        tag="div"
      >
        {selectInsertionFrac}
      </_Builtin.Block>
    </_Component>
  );
}
