"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SubmitButton.module.css";

export function SubmitButton({
  as: _Component = _Builtin.Link,

  link = {
    href: "#",
  },

  text = "Submit Change",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "submit-inactive")}
      button={true}
      block=""
      options={link}
    >
      {text}
    </_Component>
  );
}
