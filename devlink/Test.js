"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Test.module.css";

export function Test({ as: _Component = _Builtin.FormButton }) {
  return (
    <_Component
      className={_utils.cx(_styles, "submit-button-2")}
      type="submit"
      value="Submit"
      data-wait="Please wait..."
      id="submit_query"
    />
  );
}
