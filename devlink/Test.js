"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function Test({
  as: _Component = _Builtin.Block,
  text = "This is a test component from WebFlow.",
}) {
  return <_Component tag="div">{text}</_Component>;
}
