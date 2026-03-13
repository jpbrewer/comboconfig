"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SelectBox.module.css";

export function SelectBox({
  as: _Component = _Builtin.Block,
  label = "Claude put label for SelectBox here.",
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
        className={_utils.cx(_styles, "single-select-wrapper")}
        tag="div"
        data-insertion-point="single_select"
      />
    </_Component>
  );
}
