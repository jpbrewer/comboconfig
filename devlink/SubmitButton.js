"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SubmitButton.module.css";

export function SubmitButton({
  as: _Component = _Builtin.Link,
  variant = "Base",

  link = {
    href: "#",
  },

  text = "Submit Change",
}) {
  const _styleVariantMap = {
    Base: "",
    Active: "w-variant-108e7395-caa1-2b36-4a3a-0352d79eee48",
    Inactive: "w-variant-f0f56c11-e4c0-44b2-57eb-b765c4d35ea0",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return (
    <_Component
      className={_utils.cx(_styles, "submit-base", _activeStyleVariant)}
      button={true}
      block=""
      options={link}
    >
      {text}
    </_Component>
  );
}
