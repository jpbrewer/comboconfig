"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SelectBox } from "./SelectBox";
import * as _utils from "./utils";
import _styles from "./ConfigurationGroup.module.css";

export function ConfigurationGroup({
  as: _Component = _Builtin.Block,
  groupName = "Claude put label for group name here.",
  selectBoxLabel = "Claude put label for SelectBox here.",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-31")}
      id={_utils.cx(
        _styles,
        "w-node-c4f05fb7-2984-b605-f2a4-093836d61fc9-36d61fc9"
      )}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "text-block-10")} tag="div">
        {groupName}
      </_Builtin.Block>
      <_Builtin.Block tag="div" data-insertion-point="configuration_group">
        <SelectBox label={selectBoxLabel} />
      </_Builtin.Block>
    </_Component>
  );
}
