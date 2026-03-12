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
    <_Component className={_utils.cx(_styles, "div-block-32")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "text-block-11")} tag="div">
        {label}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-33")}
        tag="div"
        data-insertion-point="single_select"
      />
    </_Component>
  );
}
